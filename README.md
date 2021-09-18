Here are the steps to run the project locally.

1. Install Docker
2. Create a docker volume to store your data: `docker volume create --name=property-management-data`
3. Run the application: `./gradlew bootJar && docker-compose up --build -d && docker logs rental-inspection-system_web_1 -f`