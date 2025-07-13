import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'eccorm_products',
        allowed_formats:['jpeg','jpg','png','webp', 'avif'],
    }
})

export default multer({ storage })