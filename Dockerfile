# --- Stage 1: Build Frontend (Vite) ---
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Build Backend (Java 21 + Maven) ---
FROM maven:3.9-eclipse-temurin-21-alpine AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml ./
COPY backend/src ./src
RUN mvn clean package -DskipTests

# --- Stage 3: Final Production Image ---
FROM eclipse-temurin:21-jre-alpine

# Install Nginx, Supervisor, dan curl
RUN apk add --no-cache nginx supervisor curl && \
    mkdir -p /run/nginx /var/log/supervisor

# 1. Timpa langsung /etc/nginx/nginx.conf dengan konfigurasi lengkap yang bersih
COPY <<EOF /etc/nginx/nginx.conf
user root;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /run/nginx/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    access_log /var/log/nginx/access.log;

    server {
        listen 80;
        server_name localhost;

        root /var/www/localhost/htdocs;
        index index.html index.htm;

        location / {
            try_files \$uri \$uri/ /index.html;
        }

        location /api {
            proxy_pass http://127.0.0.1:8080;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
        }
    }
}
EOF

# 2. Salin hasil build Vite ke root Nginx
COPY --from=frontend-build /app/frontend/dist /var/www/localhost/htdocs

# 3. Salin backend JAR
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar

EXPOSE 80

# 4. Supervisor config
COPY <<EOF /etc/supervisor.d/conf.ini
[unix_http_server]
file=/run/supervisord.sock
chmod=0700

[supervisord]
nodaemon=true
logfile=/var/log/supervisor/supervisord.log
pidfile=/var/run/supervisord.pid

[supervisorctl]
serverurl=unix:///run/supervisord.sock

[program:nginx]
command=nginx -g "daemon off;"
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:java-backend]
command=java -jar /app/app.jar
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
EOF

ENTRYPOINT ["/usr/bin/supervisord", "-c", "/etc/supervisor.d/conf.ini"]
