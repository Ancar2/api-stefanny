const asyncHandler = require('express-async-handler');
const SeccionOne = require('../models/seccion-one.model');

// @desc    Obtener configuración de Sección One (Público)
// @route   GET /api/seccion-one
// @access  Público
const getSeccionOne = asyncHandler(async (req, res) => {
    let seccionOne = await SeccionOne.findOne();
    if (!seccionOne) {
        // Create with defaults if doesn't exist
        seccionOne = await SeccionOne.create({});
    }
    res.json(seccionOne);
});

// @desc    Actualizar configuración de Sección One (Admin)
// @route   PUT /api/admin/seccion-one
// @access  Privado/Admin
const updateSeccionOne = asyncHandler(async (req, res) => {
    console.log('--- UPDATE SECCION ONE DEBUG ---');

    let seccionOne = await SeccionOne.findOne();
    if (!seccionOne) {
        seccionOne = new SeccionOne({});
    }

    // Update fields using .set()
    seccionOne.set(req.body);

    // Mark nested objects as modified
    seccionOne.markModified('glassPanelConfig');
    seccionOne.markModified('professionConfig');
    seccionOne.markModified('titleConfig');
    seccionOne.markModified('descriptionConfig');
    seccionOne.markModified('socialConfig');
    seccionOne.markModified('imageConfig');

    const updatedSeccionOne = await seccionOne.save();

    console.log('SeccionOne updated successfully');
    res.json(updatedSeccionOne);
});

module.exports = {
    getSeccionOne,
    updateSeccionOne
};
