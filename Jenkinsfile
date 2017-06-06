pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
  environment {
    NODE_ENV = 'test'
  }
}