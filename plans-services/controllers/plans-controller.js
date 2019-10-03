const router = require('express').Router();
const asyncWrapper = require('../../utilities/async-wrapper').AsyncWrapper;
const PlansService = require('../services/plans-service');
const validator = require('../middleware/validator');
const protectedRoute = require("../middleware/protected-route");

const plansService = new PlansService();
//   api/plans
router.use(protectedRoute());
router.get("/", asyncWrapper(async (req, res) => {
  let userId = req.user;
  let plans = await plansService.findAll(userId);
  res.send(plans);
}));

router.get("/:id", asyncWrapper(async (req, res) => {
  let id = req.params.id;
  let plan = await plansService.findOne(id);
  res.send(plan);
}));

router.post("/", [validator("Plan")] , asyncWrapper(async (req, res) => {
  let plan = req.body;
  let userId = req.user;
  plan.userId = userId;
  plan = await plansService.create(plan);
  res.send(plan);
}));

router.delete("/:id", asyncWrapper(async (req, res) => {
  let id = req.params.id;
  await plansService.deleteOne(id);
  res.sendStatus(200);
}));

module.exports = router;