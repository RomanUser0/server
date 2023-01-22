import { body } from "express-validator";

export const authValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5})
]