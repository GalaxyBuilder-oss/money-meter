# --- Stage 1: Build Frontend (Vite) ---
FROM node:26-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Build Backend (Java 21 + Maven) ---
FROM eclipse-temurin:21-jdk-alpine AS backend-build
WORKDIR /app/backend
RUN apk add --no-cache maven
COPY backend/pom.xml ./
COPY backend/src ./src
RUN mvn clean package -DskipTests

# --- Stage 3: Final Production Image ---
FROM eclipse-temurin:21-jre-alpine

# Install Nginx dan Supervisor
RUN apk add --no-cache nginx supervisor

# 1. Buat custom konfigurasi Nginx agar langsung mengarah ke file build Vite & Proxy API ke Backend
RUN mkdir -p /etc/nginx/http.d/
COPY <<EOF /etc/nginx/http.d/default.conf
server {
    listen 80;
    server_name localhost;

    root /var/www/localhost/htdocs;
    index index.html index.htm;

    # Supaya SPA (Single Page Application seperti Vite/React Router) tidak 404 saat refresh
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # (Opsional) Jika ingin meneruskan request /api ke Spring Boot di port 8080
    location /api {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
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
RUN mkdir -p /etc/supervisor.d/
COPY <<EOF /etc/supervisor.d/conf.ini
[supervisord]
nodaemon=true

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
