const {Router} = require("express");
const router = Router();

const userRouter = require("./user.routes");
const jobRouter = require("./job.routes");

router.use("/user", userRouter);
router.use("/jobs", jobRouter);

module.exports = router;