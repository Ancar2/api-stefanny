const asyncHandler = require('express-async-handler');
const Hero = require('../models/hero.model');

// @desc    Obtener contenido del Hero (Público)
// @route   GET /api/hero
// @access  Público
const getHero = asyncHandler(async (req, res) => {
    // Busca el primer documento, si no existe lo crea con valores por defecto
    let hero = await Hero.findOne();
    if (!hero) {
        hero = await Hero.create({});
    }
    res.json(hero);
});

// @desc    Actualizar contenido del Hero (Admin)
// @route   PUT /api/admin/hero
// @access  Privado/Admin
const updateHero = asyncHandler(async (req, res) => {
    console.log('--- UPDATE HERO DEBUG ---');
    // console.log('Payload:', JSON.stringify(req.body, null, 2));

    // 1. Find existing or create
    let hero = await Hero.findOne();
    if (!hero) {
        hero = new Hero({});
    }

    // 2. Update fields using .set() (Better for Mongoose)
    hero.set(req.body);

    // Forces Mongoose to know this path changed (Critical for nested objects sometimes)
    hero.markModified('model3dLandmarks');
    hero.markModified('imagenUnoConfig');
    hero.markModified('imagenDosConfig');

    // 3. Save (triggers validation)
    const updatedHero = await hero.save();

    console.log('Hero updated successfully. Landmarks:', JSON.stringify(updatedHero.model3dLandmarks || {}, null, 2));
    res.json(updatedHero);
});

module.exports = {
    getHero,
    updateHero
};
