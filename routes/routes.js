const express = require('express');
const router = express.Router();


// Controladores
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');
const heroController = require('../controllers/hero.controller');
const aboutController = require('../controllers/about.controller');
const serviceController = require('../controllers/service.controller');
const galleryController = require('../controllers/gallery.controller');
const testimonialController = require('../controllers/testimonial.controller');
const messageController = require('../controllers/message.controller');
const uploadController = require('../controllers/upload.controller');
const policyController = require('../controllers/policy.controller');
const statsController = require('../controllers/stats.controller');
const contentController = require('../controllers/content.controller');
const mediaController = require('../controllers/media.controller');
const themeController = require('../controllers/theme.controller');
const seccionOneController = require('../controllers/seccion-one.controller');
const seccionTwoController = require('../controllers/seccion-two.controller');

// Middlewares
const upload = require('../middleware/uploadMiddleware');
const validate = require('../middleware/validateMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');
const { loginValidation, registerValidation } = require('../middleware/auth.validators');



// --- Rutas de Autenticación (/auth) ---
router.post('/auth/register', registerValidation, validate, authController.registerUser);
router.post('/auth/login', loginValidation, validate, authController.loginUser);
router.post('/auth/logout', authController.logoutUser);
router.post('/auth/forgotpassword', authController.forgotPassword);
router.put('/auth/resetpassword/:resettoken', authController.resetPassword);
router.get('/auth/me', protect, authController.getMe);


// --- Rutas de Usuario (/users) ---
// Rutas de perfil (Primero para evitar conflicto con /:id)
router.put('/users/profile', protect, userController.updateUserProfile);
router.put('/users/password', protect, userController.updateUserPassword);
// Rutas de administrador
router.get('/users', protect, admin, userController.getUsers);
router.get('/users/:id', protect, admin, userController.getUser);
router.put('/users/:id', protect, admin, userController.updateUser);
router.delete('/users/:id', protect, admin, userController.deleteUser);



// --- Rutas de Productos (Públicas) ---
router.get('/products', productController.getPublicProducts);
router.get('/products/:id', productController.getPublicProductById);


// --- Rutas de Admin (Stats) ---
router.get('/admin/stats', protect, admin, statsController.getDashboardStats);
// --- Rutas de Visitas (Públicas) ---
router.post('/visits', statsController.recordVisit);


// --- Rutas de Admin (Productos) ---
router.get('/admin/products', protect, admin, productController.getAdminProducts);
router.get('/admin/products/:id', protect, admin, productController.getAdminProductById); // Nueva ruta para carga individual
router.post('/admin/products', protect, admin, productController.createProduct);
router.put('/admin/products/:id', protect, admin, productController.updateProduct);
router.delete('/admin/products/:id', protect, admin, productController.deleteProduct);


// --- Rutas de Contenido Estático (Hero & About) ---
// Hero
router.get('/hero', heroController.getHero);
router.put('/admin/hero', protect, admin, heroController.updateHero);
// About
router.get('/about', aboutController.getAbout);
router.put('/admin/about', protect, admin, aboutController.updateAbout);

// Seccion One
router.get('/seccion-one', seccionOneController.getSeccionOne);
router.put('/admin/seccion-one', protect, admin, seccionOneController.updateSeccionOne);

// Seccion Two
router.get('/seccion-two', seccionTwoController.getSeccionTwo);
router.put('/admin/seccion-two', protect, admin, seccionTwoController.updateSeccionTwo);


// Legal (Políticas)
router.get('/policies', policyController.getPolicies);
router.put('/admin/policies', protect, admin, policyController.updatePolicies);




// --- Rutas de Listas (Servicios & Galería) ---
// Servicios
router.get('/services', serviceController.getPublicServices);
router.get('/services/:id', serviceController.getServiceById); // Nueva ruta individual
router.get('/admin/services', protect, admin, serviceController.getAdminServices); // Admin list
router.post('/admin/services', protect, admin, serviceController.createService);
router.put('/admin/services/:id', protect, admin, serviceController.updateService);
router.delete('/admin/services/:id', protect, admin, serviceController.deleteService);
// Galería
router.get('/gallery', galleryController.getPublicGallery);
router.get('/gallery/:id', galleryController.getGalleryItemById); // Single item
router.get('/admin/gallery', protect, admin, galleryController.getAdminGallery); // Admin List
router.post('/admin/gallery', protect, admin, galleryController.createGalleryItem);
router.put('/admin/gallery/:id', protect, admin, galleryController.updateGalleryItem);
router.delete('/admin/gallery/:id', protect, admin, galleryController.deleteGalleryItem);



// --- Rutas de Interacción (Testimonios & Contacto) ---
// Testimonios
router.get('/testimonials', testimonialController.getPublicTestimonials);
router.post('/testimonials', testimonialController.createTestimonial);
router.get('/admin/testimonials', protect, admin, testimonialController.getAdminTestimonials);
router.patch('/admin/testimonials/:id/approve', protect, admin, testimonialController.approveTestimonial);
router.delete('/admin/testimonials/:id', protect, admin, testimonialController.deleteTestimonial);
// Contacto
router.post('/contact', messageController.createMessage);
router.get('/admin/messages', protect, admin, messageController.getAdminMessages);
router.patch('/admin/messages/:id/read', protect, admin, messageController.markAsRead);
router.delete('/admin/messages/:id', protect, admin, messageController.deleteMessage);

const localUpload = require('../middleware/localUpload.middleware');

// --- ruta de Subida de Archivos --
router.post('/upload', protect, admin, (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Multer/Cloudinary Error:', err);
            return res.status(400).json({ message: err.message || 'Error subiendo archivo' });
        }
        next();
    });
}, uploadController.uploadFile);

router.post('/upload/local', protect, admin, localUpload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo' });
    }
    // Return relative URL
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// --- Rutas de Contenido Dinámico ---
router.get('/admin/content', protect, admin, contentController.getAllContent);
router.get('/admin/content', protect, admin, contentController.getAllContent);
router.get('/content/:key', contentController.getContentByKey); // Public access
router.get('/admin/content/item/:id', protect, admin, contentController.getContentById); // Por ID para editar
router.get('/admin/content/:key', protect, admin, contentController.getContentByKey);
router.post('/admin/content', protect, admin, contentController.createContent);
router.put('/admin/content/:id', protect, admin, contentController.updateContent);
router.delete('/admin/content/:id', protect, admin, contentController.deleteContent);

// --- Rutas de Media Library ---
router.get('/admin/media', protect, admin, mediaController.getMediaLibrary);
router.delete('/admin/media', protect, admin, mediaController.deleteMedia);

// --- Rutas de Archivos Locales ---
router.get('/admin/local-files', protect, admin, uploadController.getLocalFiles);
router.delete('/admin/local-files/:filename', protect, admin, uploadController.deleteLocalFile);

// --- Rutas de Tema del Dashboard ---
router.get('/admin/theme', protect, admin, themeController.getTheme);
router.put('/admin/theme', protect, admin, themeController.updateTheme);


module.exports = router;





