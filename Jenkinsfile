pipeline {
    agent any

    tools {nodejs "nodejs"}

    environment {
        GIT_URL = "https://github.com/ia-project-org/ReactApp.git"
        DOCKER_TAG_NAME = 'latest'
        DOCKER_REGISTRY = 'soukaina915/ai-front'
        DOCKER_REGISTRY_CREDENTIALS_ID = 'soukaina-docker-hub' 
        MANIFEST_URL = 'https://github.com/ia-project-org/FrontendManifest.git'
        GITHUB_CREDENTIALS = "github-soukaina"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Git Checkout') {
            steps {
                echo "Cloning code from branch..."
                git url: GIT_URL, branch: "main"
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing dependencies..."
                    sh 'npm install'
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script { 
                    echo "Running Vitest tests..."
                    sh 'npm test -- --reporter=json > test-output.json'
                    stash name: 'test-results', includes: 'test-output.json'
                }
            }
        }

        stage('Print JSON content') {
            steps {
                script {
                    sh 'cat ./test-output.json'
                }
            }
        }

        stage("Sonarqube Analysis") {
            environment {
                SCANNER_HOME = tool 'sonar'  // sonar-scanner is the name of the tool in the manage jenkins> tool configuration
            }
            steps {
                withSonarQubeEnv(installationName: 'sonar' , credentialsId: 'sonar') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner"

                }
            }
        }

        stage('Quality gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: false ,  credentialsId: 'sonar'
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    echo "Building and pushing docker image..."
                    def dockerImage = docker.build("${DOCKER_REGISTRY}:${DOCKER_TAG_NAME}")
                    
                    docker.withRegistry('', DOCKER_REGISTRY_CREDENTIALS_ID) {
                        dockerImage.push()
                    }
                }
            }
        }


        stage('Push Manifest Changes to Git') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: GITHUB_CREDENTIALS, passwordVariable: 'GITHUB_PASSWORD', usernameVariable: 'GITHUB_USERNAME')]) {
                        git credentialsId: GITHUB_CREDENTIALS, url: MANIFEST_URL, branch: 'main'
                        sh """
                            git add .
                            git commit -m "Update Kubernetes manifests for deployment"
                            git push https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com/ia-project-org/FrontendManifest.git main
                        """
                    }
                }
            }
        }
    }
    

    post {
        always {
            // Cleanup workspace after build
            cleanWs()
        }
        success {
            // Actions on successful deployment
            echo 'Deployment successful!'
        }
        failure {
            // Actions on failed deployment
            echo 'Deployment failed!'
        }
    }
}