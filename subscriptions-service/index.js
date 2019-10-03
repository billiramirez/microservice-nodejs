const express = require('express');

const Middleware = require("../middleware/middleware");
const ErrorHandlingMiddleware = require("../middleware/error-handling");
const AuthenticationMiddleware = require("./middleware/auth");

const PORT = process.env.PORT;
const app = express();

const SubscriptionsController = require('./controllers/subscriptions-controller');

Middleware(app);
AuthenticationMiddleware(app);
app.use("", SubscriptionsController);

//error middlware must be defined after all other middlware/routes
ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
  console.log('server listening on port ', PORT);
})