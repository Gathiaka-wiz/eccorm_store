import { Router } from 'express';

// middleware import
import verifyToken from '../middleware/verifyToken.middleware.js';
import verifyAdmin from '../middleware/verifyAdmin.middleware.js';
import upload from '../middleware/upload.js';
import {
	productCreationValidation,
	productEditValidation,
	productDeletionValidation,
} from '../middleware/validator.middleware.js';

// controller import
import {
	getAllUsers,
	createProduct,
	editProduct,
	deleteProduct,
	checkAdmin,
} from '../controllers/admin.controller.js';

const router = Router();

router.use(verifyToken);
router.use(verifyAdmin);

router.get('/check-admin', checkAdmin);

router.get('/users', getAllUsers);

router.post(
	'/create-product',
	upload.single('image'),
	productCreationValidation,
	createProduct
);

router.patch(
	'/:product_id/edit-product',
	upload.single('image'),
	productEditValidation,
	editProduct
);

router.delete(
	'/:product_id/delete-product',
	productDeletionValidation,
	deleteProduct
);

export const AdminRoutes = router;
