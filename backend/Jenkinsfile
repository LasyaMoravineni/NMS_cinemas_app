pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/LasyaMoravineni/moviebooking-backend.git'
            }
        }

        stage('Build JAR') {
            steps {
                sh '''
                export MAVEN_OPTS="-Xms256m -Xmx512m"
                mvn clean package -DskipTests
                '''
            }
        }

        stage('Run Application') {
            steps {
                sh '''
                pkill -f moviebooking || true
                nohup java -jar target/moviebooking-0.0.1-SNAPSHOT.jar > app.log 2>&1 &
                '''
            }
        }
    }
}
