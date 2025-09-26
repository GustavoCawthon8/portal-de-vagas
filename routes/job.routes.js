const {Router} = require("express");
const jobRouter = Router();

const jobController = require("../controllers/Job.controller");
const authMiddleware = require("../middlewares/authMiddleware");

//rotas publicas
jobRouter.get("/", jobController.getAll);
jobRouter.get("/:id", jobController.getById);

//rotas protegidas
jobRouter.post("/", authMiddleware, jobController.create);
jobRouter.get("/me/mine",authMiddleware, jobController.getMyJobs);
jobRouter.post("/:id", authMiddleware, jobController.update);
jobRouter.get("/:id",authMiddleware, jobController.delete);

module.exports = jobRouter;