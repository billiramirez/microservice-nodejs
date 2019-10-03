const express = require('express');
const Middleware = require("../middleware/middleware");
const ErrorHandlingMiddleware = require("../middleware/error-handling");
const AuthenticationMiddleware = require("./middleware/auth");

const PORT = process.env.PORT;
const app = express();

const PlansController = require('./controllers/plans-controller');

Middleware(app);
AuthenticationMiddleware(app);
app.use("", PlansController);
ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
  console.log('Plan service listening on port ', PORT);
})