import { Router } from "express";

import { signup, signin, signout, verifyAccount } from '../controllers/auth.controller.js';

// Validation Middleware
import { signupValidation, verificationCodeValidation, signinValidation } from "../middleware/validator.middleware.js";

import verifyToken from "../middleware/verifyToken.middleware.js";

const router = Router();



router.post('/signup', signupValidation, signup);

router.post('/signup/verify-account', verificationCodeValidation, verifyAccount);

router.post('/signin', signinValidation, signin);

router.post('/signout',verifyToken,  signout);


export  const AuthRoutes = router
