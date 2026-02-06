const asyncHandler = require('express-async-handler');
const Gallery = require('../models/gallery.model');

// @desc    Obtener galería (Público)
// @route   GET /api/gallery
// @access  Público
const getPublicGallery = asyncHandler(async (req, res) => {
    const items = await Gallery.find({ active: true }).sort({ createdAt: -1 });
    res.json(items);
});

// @desc    Obtener TODA la galería (Admin)
// @route   GET /api/admin/gallery
// @access  Privado/Admin
const getAdminGallery = asyncHandler(async (req, res) => {
    const items = await Gallery.find({}).sort({ createdAt: -1 });
    res.json(items);
});

// @desc    Obtener item por ID
// @route   GET /api/gallery/:id
const getGalleryItemById = asyncHandler(async (req, res) => {
    const item = await Gallery.findById(req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404);
        throw new Error('Item no encontrado');
    }
});

// @desc    Agregar item a galería (Admin)
// @route   POST /api/admin/gallery
// @access  Privado/Admin
const createGalleryItem = asyncHandler(async (req, res) => {
    const item = await Gallery.create(req.body);
    res.status(201).json(item);
});

// @desc    Actualizar item galería (Admin)
// @route   PUT /api/admin/gallery/:id
// @access  Privado/Admin
const updateGalleryItem = asyncHandler(async (req, res) => {
    const item = await Gallery.findById(req.params.id);
    if (item) {
        const updatedItem = await Gallery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedItem);
    } else {
        res.status(404);
        throw new Error('Item no encontrado');
    }
});

// @desc    Eliminar item galería (Admin)
// @route   DELETE /api/admin/gallery/:id
// @access  Privado/Admin
const deleteGalleryItem = asyncHandler(async (req, res) => {
    const item = await Gallery.findById(req.params.id);
    if (item) {
        await item.deleteOne();
        res.json({ message: 'Item eliminado eliminada' });
    } else {
        res.status(404);
        throw new Error('Item no encontrado');
    }
});

module.exports = {
    getPublicGallery,
    getAdminGallery,
    getGalleryItemById,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
};
