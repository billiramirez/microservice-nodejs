const AMQP_CONNECTION_STRING = "amqp://gydxisnw:rEPye9zbBP-xa7iU_7nttoX1eQcvupV9@baboon.rmq.cloudamqp.com/gydxisnw"
const AMQP_CHANNEL_NAME = "PAYMENTS_GATEWAY";
const AMQP_QUEUE_NAME = "PAYMENTS_QUEUE";

const TOKEN_ISSUER = "saas";
const AUTH_SECRET = "lafjnalckfjnlarnaiflaancfafa";

module.exports = {
  apps: [
    {
      name: "plans-service",
      script: "./plans-services/index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        MYSQL_USER: "root",
        MYSQL_PASS: "123456789",
        MYSQL_HOST: "localhost",
        MYSQL_PORT: 3307,
        MYSQL_DB: "PlansDb",
        PORT: 3001,
        TOKEN_ISSUER,
        AUTH_SECRET,
        REDIS_HOST: "localhost",
        REDIS_PORT: "6380",
        REDIS_PASSWORD: ""
      },
      env_production: {
        NODE_ENV: "development",
      }
    },
    {
      name: "subscriptions-service",
      script: "./subscriptions-service/index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        MYSQL_USER: "root",
        MYSQL_PASS: "123456789",
        MYSQL_HOST: "localhost",
        MYSQL_PORT: 3308,
        MYSQL_DB: "SubscriptionsDb",
        PORT: 3002,
        AMQP_CONNECTION_STRING,
        AMQP_CHANNEL_NAME,
        AMQP_QUEUE_NAME,
        TOKEN_ISSUER,
        AUTH_SECRET
      },
      env_production: {
        NODE_ENV: "development",
      }
    },
    {
      name: "payments-service",
      script: "./payments-service/index.js",
      watch: true,
      env: {
        AMQP_CONNECTION_STRING,
        AMQP_CHANNEL_NAME,
        AMQP_QUEUE_NAME
      },
      env_production: {

      }
    },
    {
      name: "auth-service",
      script: "./auth-service/index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        MYSQL_USER: "root",
        MYSQL_PASS: "123456789",
        MYSQL_HOST: "localhost",
        MYSQL_PORT: 3309,
        MYSQL_DB: "Users",
        PORT: 3003,
        TOKEN_ISSUER,
        AUTH_SECRET
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
}