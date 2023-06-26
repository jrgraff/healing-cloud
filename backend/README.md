## Tecnologies

This project was developed using cutting edge back-end technologies.

- [Typescript](https://www.typescriptlang.org/)
- [Serverless Framework](https://www.serverless.com/)
- [Dynamodb](https://aws.amazon.com/pt/dynamodb/)

## 💻 Getting started

### Requirements

- You need to install [Node.js](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/) and [Serverless](https://www.serverless.com/) to run this project.

**Clone the project and access the folder**

```bash
$ git clone https://github.com/jrgraff/healing-cloud.git && cd healing-cloud/backend
```

**Follow the steps below to start on dev**

```bash
# Install dependencies
$ yarn

# Install local dynamodb
$ yarn dynamodb:install

# Start dynamodb
$ yarn dynamodb:start 

# Run the api serverless locally
$ serverless offline
```

The app will be available for access on your browser at `http://localhost:3000`

**To production you need to configure your serverless credentials and then run the code below**

```bash
# Run serverless framework
$ serverless deploy
```
