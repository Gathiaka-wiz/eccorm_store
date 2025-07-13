import { body } from 'express-validator';
import { param } from 'express-validator';

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
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').escape(),
];

export const eraseDataValidation = [
    body('password').notEmpty().withMessage('Password is required').escape(),
];

// Admin validation
export const productCreationValidation = [
    body('product_name').trim().notEmpty().isString().withMessage('Name is required'),
    body('price').trim().notEmpty().isNumeric().withMessage('Price is required'),
    body('available_stock').trim().notEmpty().isNumeric().withMessage('Available stock is required'),
    body('description').trim().notEmpty().isString().withMessage('Description is required'),
    body('image')
        .custom(value => {
            if (!value) return true;
            const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const fileType = value.mimetype;
            return acceptedTypes.includes(fileType);
        })
        .withMessage('Image must be an image file').escape(),
];

export const productEditValidation = [
    param('id').isMongoId().withMessage('Invalid product id'),
    body('product_name').trim().optional().isString().withMessage('Name is required'),
    body('price').trim().optional().isNumeric().withMessage('Price is required'),
    body('available_stock').trim().optional().isNumeric().withMessage('Available stock is required'),
    body('description').trim().optional().isString().withMessage('Description is required'),
    body('sold_stock').trim().optional().isNumeric().withMessage('Sold stock is required'),
    body('image').optional()
        .custom(value => {
            if (!value) return true;
            const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const fileType = value.mimetype;
            return acceptedTypes.includes(fileType);
        })
        .withMessage('Image must be an image file').escape(),
];  

export const productDeletionValidation = [
    param('id').isMongoId().withMessage('Invalid product id').escape()
];