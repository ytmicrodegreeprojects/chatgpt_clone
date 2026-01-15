pipeline {
    agent any

    stages {
        stage( 'Checkout' ) {
            steps {
                git branch: 'main',
                url: 'https://github.com/ytmicrodegreeprojects/chatgpt_clone.git'
            }
        }
        stage( 'Build Docker Image' ){
            steps {
                sh 'docker build -t chatgpt_clone .' 
            }
        }
        stage( 'Deploy App' ){
            steps {
                sh 'docker stop chatgpt-clone-container || true'
                sh 'docker rm chatgpt-clone-container || true'
                sh 'docker run -d --name chatgpt-clone-container -p 3000:3000 --env-file .env chatgpt_clone'
            }
        }
    }
}