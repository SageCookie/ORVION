FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache curl
RUN addgroup -S orvion && adduser -S orvion -G orvion
WORKDIR /app
COPY --from=build /workspace/target/orvion-backend-1.0.0.jar /app/app.jar
RUN mkdir -p /app/uploads && chown -R orvion:orvion /app
EXPOSE 8080
USER orvion
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
