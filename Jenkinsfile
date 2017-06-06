pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        sh '''pwd 
ls 
node -v
/usr/local/bin/npm test'''
      }
    }
  }
  environment {
    NODE_ENV = 'test'
  }
}