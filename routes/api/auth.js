const express = require("express");

const { authenticate, validateBody, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");
const { Schema } = require("mongoose");

const router = express.Router();

router.post("/singup", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendEmail);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.subscription
);

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
