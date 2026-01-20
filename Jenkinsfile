pipeline{
    agent any

    environment {
        OPENAI_API_KEY = credentials('OPENAI_API_KEY')
        PORT = '3000'
    }

    stages {
        stage( 'Checkout' ){
            steps {
                git branch: 'main',
                url: 'https://github.com/ytmicrodegreeprojects/chatgpt_clone.git'
            }
        }

        stage( 'Build Docker Image' ) {
            steps {
                sh 'docker build -t  chatgpt_clone .'
            }
        }

        stage( 'Deploy App' ) {
            steps {
                script {
                    sh """
                        docker stop chatgpt-clone-container || true
                        docker rm chatgpt-clone-container || true
                        docker run -d \
                            --name chatgpt-clone-container \
                            -p 3000:3000 \
                            -e OPENAI_API_KEY='${OPENAI_API_KEY}' \
                            -e PORT='${PORT}' \
                            chatgpt_clone 
                    """
                }
            }
        }
    }
}