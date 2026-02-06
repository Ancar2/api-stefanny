const asyncHandler = require('express-async-handler');
const About = require('../models/about.model');

// @desc    Obtener contenido About (Público)
// @route   GET /api/about
// @access  Público
const getAbout = asyncHandler(async (req, res) => {
    let about = await About.findOne();
    if (!about) {
        about = await About.create({});
    }
    res.json(about);
});

// @desc    Actualizar contenido About (Admin)
// @route   PUT /api/admin/about
// @access  Privado/Admin
const updateAbout = asyncHandler(async (req, res) => {
    const about = await About.findOneAndUpdate({}, req.body, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
    });
    res.json(about);
});

module.exports = {
    getAbout,
    updateAbout
};
