# Use an official OpenJDK runtime as a parent image
FROM openjdk:17.0.1-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file to the container
COPY build/libs/*.jar IngredientService.jar

# Run the JAR file
ENTRYPOINT ["java", "-jar", "IngredientService.jar"]