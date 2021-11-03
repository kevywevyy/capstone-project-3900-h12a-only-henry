# Setup

Here are the steps to run the project locally.

1. Install Docker
2. Create a docker volume to store your data: `docker volume create --name=property-management-data`
3. Run the application: `./gradlew bootJar && docker-compose up --build -d && docker logs rental-inspection-system_web_1 -f`

# Pushing to this repository
1. Add the remote
`git remote add <REMOTE_NAME> git@github.com:unsw-cse-comp3900-9900-21T3/capstone-project-3900-h12a-only-henry.git`
2. Push to remote
`git push -u <REMOTE_NAME> <BRANCH_NAME>`

# Restarting the database
docker-compose down && docker volume rm property-management-data && docker volume create --name=property-management-data
