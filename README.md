# NEWS AGGREGATOR 

### Before proceeding, ensure you have the following installed on your system:

     Docker and Docker Compose
        Download and install Docker: https://www.docker.com/.

    Node.js (Optional)
        Only needed if you're debugging or running the application locally without Docker.
        Download Node.js: https://nodejs.org/.
    
    Git
        For cloning the repository.
        Download Git: https://git-scm.com/.

###  Steps to Set Up the Application

    1. Clone Repository 
        git clone git@github.com:ah3eyy/news-aggregator-fe.git
        cd your-repo-name

    2. Create an Environment File and Install 
       Create a .env file in the root of the project. This file contains environment variables used by the React application.
       cp .env.example .env
       Edit the .env file as needed:
       REACT_APP_API_URL=http://your-backend-api-url
        
       After creating .env 
        npm install


    3. Build and Run with Docker
       Ensure Docker is running on your machine, then proceed with the following:

       Build Docker Image
         docker build

       Run Docker
         docker compose up
    
    4. Application ready on http://localhost:5173
