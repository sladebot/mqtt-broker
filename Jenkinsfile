pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        sh '/usr/local/bin/npm test'
      }
    }
  }
  environment {
    NODE_ENV = 'test'
  }
}