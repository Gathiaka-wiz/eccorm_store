import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config/env.config.js';


import { v2 as cloudinary } from 'cloudinary';

console.log('Cloudinary Configured'.green.bold);

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY ,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
})

export default cloudinary
