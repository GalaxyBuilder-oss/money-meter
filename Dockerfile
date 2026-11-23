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

# Jalankan menggunakan mvn global, bukan ./mvnw
RUN mvn clean package -DskipTests

# --- Stage 3: Final Production Image ---
FROM eclipse-temurin:21-jre-alpine

# Install Nginx dan Supervisor untuk menjalankan 2 proses (Nginx & Java) dalam 1 container
RUN apk add --no-cache nginx supervisor

# 1. Setup Nginx untuk Frontend
WORKDIR /usr/share/nginx/html
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Hanya ekspos port frontend (Nginx)
EXPOSE 80

# 2. Setup Backend JAR dari Stage 2
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar

# 3. Setup Supervisor Configuration untuk menjalankan Nginx dan Java Spring Boot bersamaan
RUN mkdir -p /etc/supervisor.d/
COPY <<EOF /etc/supervisor.d/conf.ini
[supervisord]
nodaemon=true

[program:nginx]
command=nginx -g "daemon off;"
autostart=true
autorestart=true
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0

[program:java-backend]
command=java -jar /app/app.jar
autostart=true
autorestart=true
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
EOF

# Jalankan supervisor untuk menghidupkan Nginx dan Spring Boot sekaligus
ENTRYPOINT ["/usr/bin/supervisord", "-c", "/etc/supervisor.d/conf.ini"]
