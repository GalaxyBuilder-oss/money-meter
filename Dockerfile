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

# Install Maven secara langsung via apk
RUN apk add --no-cache maven

COPY backend/pom.xml ./
COPY backend/src ./src
RUN mvn clean package -DskipTests

# --- Stage 3: Final Production Image ---
FROM eclipse-temurin:21-jre-alpine

# Install Nginx dan Supervisor
RUN apk add --no-cache nginx supervisor

# 1. Salin hasil build Vite (Frontend) ke direktori web root Nginx
COPY --from=frontend-build /app/frontend/dist /var/www/localhost/htdocs

# 2. Salin backend JAR ke folder /app
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Hanya ekspos port frontend (Nginx) ke luar
EXPOSE 80

# 3. Setup Supervisor Configuration (Nginx + Java Backend)
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
