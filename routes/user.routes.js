const {Router} = require("express");
const userRouter = Router();

const userController = require("../controllers/User.controller");
const authMiddleware = require("../middlewares/authMiddleware");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/profile", authMiddleware, (req, res)=>{
    res.json({message: "rota protegida", user: req.user});
});

module.exports = userRouter;