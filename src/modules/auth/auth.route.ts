import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post("/signup", validateRequest (AuthValidation.signupValidationSchema), AuthControllers.signupUser);


router.post("/login", validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser);

export const AuthRoutes = router;