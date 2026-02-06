const asyncHandler = require('express-async-handler');
const DynamicContent = require('../models/content.model');

// @desc    Obtener todo el contenido dinámico
// @route   GET /api/admin/content
// @access  Privado/Admin
const getAllContent = asyncHandler(async (req, res) => {
    const { section, type, active } = req.query;

    const filter = {};
    if (section) filter.section = section;
    if (type) filter.type = type;
    if (active !== undefined) filter.active = active === 'true';

    const content = await DynamicContent.find(filter).sort({ section: 1, order: 1 });
    res.json(content);
});

// @desc    Obtener contenido por key
// @route   GET /api/admin/content/:key
// @access  Privado/Admin
const getContentByKey = asyncHandler(async (req, res) => {
    const content = await DynamicContent.findOne({ key: req.params.key });

    if (content) {
        res.json(content);
    } else {
        res.status(404);
        throw new Error('Contenido no encontrado');
    }
});

// @desc    Obtener contenido por ID (Admin)
// @route   GET /api/admin/content/item/:id
// @access  Privado/Admin
const getContentById = asyncHandler(async (req, res) => {
    const content = await DynamicContent.findById(req.params.id);

    if (content) {
        res.json(content);
    } else {
        res.status(404);
        throw new Error('Contenido no encontrado');
    }
});

// @desc    Crear nuevo contenido
// @route   POST /api/admin/content
// @access  Privado/Admin
const createContent = asyncHandler(async (req, res) => {
    const { key, type, label, section, value, active, order } = req.body;

    // Validar que el key no exista
    const existingContent = await DynamicContent.findOne({ key });
    if (existingContent) {
        res.status(400);
        throw new Error('Ya existe contenido con ese key');
    }

    // Validar tipo de value según type
    if (type === 'text' && typeof value !== 'string') {
        res.status(400);
        throw new Error('El valor debe ser un string para tipo text');
    }
    if ((type === 'text_array' || type === 'image_array') && !Array.isArray(value)) {
        res.status(400);
        throw new Error('El valor debe ser un array para tipo text_array o image_array');
    }

    const content = await DynamicContent.create({
        key,
        type,
        label,
        section,
        value,
        active,
        order
    });

    res.status(201).json(content);
});

// @desc    Actualizar contenido
// @route   PUT /api/admin/content/:id
// @access  Privado/Admin
const updateContent = asyncHandler(async (req, res) => {
    const content = await DynamicContent.findById(req.params.id);

    if (content) {
        // Validar tipo de value si se está actualizando
        if (req.body.value) {
            const type = req.body.type || content.type;
            if (type === 'text' && typeof req.body.value !== 'string') {
                res.status(400);
                throw new Error('El valor debe ser un string para tipo text');
            }
            if ((type === 'text_array' || type === 'image_array') && !Array.isArray(req.body.value)) {
                res.status(400);
                throw new Error('El valor debe ser un array');
            }
        }

        const updatedContent = await DynamicContent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedContent);
    } else {
        res.status(404);
        throw new Error('Contenido no encontrado');
    }
});

// @desc    Eliminar contenido
// @route   DELETE /api/admin/content/:id
// @access  Privado/Admin
const deleteContent = asyncHandler(async (req, res) => {
    const content = await DynamicContent.findById(req.params.id);

    if (content) {
        await content.deleteOne();
        res.json({ message: 'Contenido eliminado' });
    } else {
        res.status(404);
        throw new Error('Contenido no encontrado');
    }
});

module.exports = {
    getAllContent,
    getContentByKey,
    getContentById,
    createContent,
    updateContent,
    deleteContent
};
