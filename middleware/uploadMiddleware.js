const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurar Almacenamiento
// Configurar Almacenamiento
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Generar un nombre de archivo único con fecha para evitar conflictos
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // const filename = file.originalname.split('.')[0] + '-' + uniqueSuffix;

        const isImage = file.mimetype.startsWith('image');
        const isVideo = file.mimetype.startsWith('video');

        let resourceType = 'auto';
        if (!isImage && !isVideo) {
            resourceType = 'raw'; // For GLB/GLTF and others
        }

        const uploadParams = {
            folder: 'steffany-portfolio',
            resource_type: resourceType,
            public_id: file.originalname.split('.')[0], // Keep original name (without ext) as ID basis
            use_filename: true,
            unique_filename: true,
        };

        // Only apply image transformations if it's an image
        if (isImage) {
            uploadParams.transformation = [{ width: 1200, height: 1200, crop: 'limit' }];
            uploadParams.allowed_formats = ['jpg', 'png', 'jpeg', 'webp'];
        } else {
            // For raw files, allow specific formats or all
            // uploadParams.allowed_formats = ['glb', 'gltf', 'obj', 'pdf'];
            // Removing allowed_formats for raw to avoid issues with mimetype detection
        }

        return uploadParams;
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

module.exports = upload;
