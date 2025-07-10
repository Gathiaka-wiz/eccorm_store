import { body } from 'express-validator';
// import { param } from 'express-validator';

// Auth validation
export const signupValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters').escape(),
    body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role').escape(),
];



export const verificationCodeValidation = [
    body('code').notEmpty().isString().withMessage('Verification code is required').isLength({ min: 6, max: 6 }).withMessage('Verification code should be 6 characters long').escape()
]

export const signinValidation = [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').escape(),
];

export const eraseDataValidation = [
    body('password').notEmpty().withMessage('Password is required').escape(),
];

