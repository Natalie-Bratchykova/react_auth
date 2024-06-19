const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const router = new Router();
router.post(
  "/registration",

  body("email", "Please input correct email").isEmail(),
  body(
    "password",
    "Password length should be in the range between 4 and 20"
  ).isLength({ min: 4, max: 20 }),

  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);
module.exports = router;
