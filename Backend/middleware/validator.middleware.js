import { body, query } from 'express-validator';
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
    body('verificationToken').notEmpty().isString().withMessage('Verification code is required').isLength({ min: 6, max: 6 }).withMessage('verificationToken should be 6 characters long').escape()
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
    param('product_id').isMongoId().withMessage('Invalid product id'),
    body('product_name').trim().optional().isString().withMessage('Name is required'),
    body('price').trim().optional().isNumeric().withMessage('Price is required'),
    body('available_stock').trim().optional().isNumeric().withMessage('Available stock is required'),
    body('description').trim().optional().isString().withMessage('Description is required'),
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
    param('product_id').isMongoId().withMessage('Invalid product id').escape(),
];


// User validation
export const cartValidation = [
    param('product_id').isMongoId().withMessage('Invalid product id'),
    body('quantity').isNumeric().withMessage('Quantity must be a number').escape(),
];

export const productDeleteValidation = [
    param('product_id').isMongoId().withMessage('Invalid product id').escape(),
]

// checkout validation
export const checkoutValidation = [
    param('cart_id').isMongoId().withMessage('Invalid cart id'),
    body('phone').isMobilePhone().withMessage('Valid phone number is required'),
    body('method').isIn(['stripe', 'mpesa']).withMessage('Invalid payment method').escape(),
];

// product_id, quantity, phone, method 
export const itemCheckoutValidation = [
    param('product_id').isMongoId().withMessage('Invalid product id'),
    body('phone').isMobilePhone().withMessage('Valid phone number is required'),
    body('method').isIn(['stripe', 'mpesa']).withMessage('Invalid payment method').escape(),
]



// Cart Status validation
export const cartStatusValidation = [
    param('cart_id').isMongoId().withMessage('Cart id id required').escape()
]