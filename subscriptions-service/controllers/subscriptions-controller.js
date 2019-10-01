const router = require('express').Router();
const asyncWrapper = require('../../utilities/async-wrapper').AsyncWrapper;
const SubscriptionService = require("../services/subscriptions-service");
const validator = require("../middleware/validator");
//   api/subscriptions

const subscriptionService = new SubscriptionService();

router.get("/", asyncWrapper(async (req, res) => {
  let userId = 1;
  let subscriptions = await subscriptionService.findAll(userId);
  res.send(subscriptions);
}));

router.get("/:id", asyncWrapper(async (req, res) => {
  let subscription = await subscriptionService.findOne(req.params.id);
  res.send(subscription);
}));

router.post("/", asyncWrapper(async (req, res) => {
  let subscription = await subscriptionService.create(req.body);
  res.send(subscription);
}));

router.delete("/:id", asyncWrapper(async (req, res) => {
  let id = req.params.id;
  await subscriptionService.deleteOne(id);
  res.sendStatus(200);
}));

module.exports = router;