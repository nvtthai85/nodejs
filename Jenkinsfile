pipeline {
   agent {
    docker {
      image 'node:18-alpine' // Sử dụng Docker image có sẵn Node.js
      args '-u root' // Chạy với quyền root nếu cần
    }
  }

  environment {
    CI = 'true' // Biến môi trường cho môi trường CI
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci --no-audit' // Sử dụng bat thay vì sh trên Windows
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test'
      }
      post {
        always {
          junit '**/test-results.xml'
        }
      }
    }

    stage('Build') {
      when {
        branch 'main' // Chỉ build khi merge vào main
      }
      steps {
        sh 'npm run build' // Build ứng dụng
        archiveArtifacts artifacts: 'dist/**/*' // Lưu artifacts
      }
    }
  }

  post {
    always {
      sh 'docker system prune -f' // Dọn dẹp Docker
    }
    failure {
      slackSend color: 'danger', message: "Build ${env.BUILD_NUMBER} failed!"
    }
  }
}