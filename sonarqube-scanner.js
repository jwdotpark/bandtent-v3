const scanner = require('sonarqube-scanner')
require('dotenv').config()

console.log(process.env)

scanner(
  {
    serverUrl: 'http://localhost:9000',
    // login: 'admin',
    // password: 'admin',
    token: process.env.SONARQUBE_TOKEN,
    options: {
      'sonar.sources': './',
    },
  },
  () => process.exit()
)
