const scanner = require('sonarqube-scanner')

scanner(
  {
    serverUrl: 'http://localhost:9000',
    login: 'admin',
    password: 'admin',
    token: 'a04c6b7cfa5d9d4d3ffa26a788c08dd2dd89d179',
    options: {
      'sonar.sources': './',
    },
  },
  () => process.exit()
)
