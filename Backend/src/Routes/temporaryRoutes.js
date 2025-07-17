import { Router } from "express";
import { registerUser, verifyEmail } from "../Controllers/ValidationCheck.Controller.js";
import { googleLogin } from "../Controllers/googleOAuth.js";

const router = Router();

router.route('/register-user').post(registerUser)
router.route('/verify-email').post(verifyEmail)

// router for google login

router.route('/googleLogin').post(googleLogin)



export default router;