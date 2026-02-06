const asyncHandler = require('express-async-handler');
const SeccionTwo = require('../models/seccion-two.model');

// @desc    Obtener configuración de Sección Two (Público)
// @route   GET /api/seccion-two
// @access  Público
const getSeccionTwo = asyncHandler(async (req, res) => {
    let seccionTwo = await SeccionTwo.findOne();
    if (!seccionTwo) {
        // Create with defaults if doesn't exist
        seccionTwo = await SeccionTwo.create({});
    }
    res.json(seccionTwo);
});

// @desc    Actualizar configuración de Sección Two (Admin)
// @route   PUT /api/admin/seccion-two
// @access  Privado/Admin
const updateSeccionTwo = asyncHandler(async (req, res) => {
    console.log('--- UPDATE SECCION TWO DEBUG ---');

    let seccionTwo = await SeccionTwo.findOne();
    if (!seccionTwo) {
        seccionTwo = new SeccionTwo({});
    }

    // Update fields using .set()
    seccionTwo.set(req.body);

    // Mark nested objects as modified
    seccionTwo.markModified('previewContainerConfig');
    seccionTwo.markModified('sectionTitleConfig');
    seccionTwo.markModified('previewTitleConfig');
    seccionTwo.markModified('previewTextConfig');
    seccionTwo.markModified('styleGridConfig');
    seccionTwo.markModified('styleCardConfig');
    seccionTwo.markModified('mainContainerConfig');

    const updatedSeccionTwo = await seccionTwo.save();

    console.log('SeccionTwo updated successfully');
    res.json(updatedSeccionTwo);
});

module.exports = {
    getSeccionTwo,
    updateSeccionTwo
};
