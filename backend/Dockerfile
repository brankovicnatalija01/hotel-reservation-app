# ── Stage 1: Build the application ──────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy pom.xml first so Maven can download dependencies (better layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline --no-transfer-progress

# Copy source code and build the JAR (skip tests, they run in CI separately)
COPY src ./src
RUN mvn package -DskipTests --no-transfer-progress

# ── Stage 2: Run the application ─────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create a non-root user for security (never run apps as root in production)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

RUN chown appuser:appgroup app.jar
USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]