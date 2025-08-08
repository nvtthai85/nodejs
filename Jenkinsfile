pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm install' // Sử dụng bat thay vì sh trên Windows
      }
    }

    stage('Run Tests') {
      steps {
        bat 'npm test'
      }
      post {
        always {
          junit '**/test-results.xml'
        }
      }
    }

    stage('Run Server') {
      steps {
        bat 'start "Node Server" npm start' // Chạy server trong cửa sổ mới
      }
    }
  }

  post {
    always {
      bat 'taskkill /F /IM node.exe /T' // Đảm bảo dừng Node.js sau khi chạy
    }
  }
}