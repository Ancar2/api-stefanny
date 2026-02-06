const asyncHandler = require('express-async-handler');
const Policy = require('../models/policy.model');

// @desc    Obtener políticas (Público)
// @route   GET /api/policies
// @access  Público
const getPolicies = asyncHandler(async (req, res) => {
    let policy = await Policy.findOne();
    if (!policy) {
        policy = await Policy.create({});
    }
    res.json(policy);
});

// @desc    Actualizar políticas (Admin)
// @route   PUT /api/admin/policies
// @access  Privado/Admin
const updatePolicies = asyncHandler(async (req, res) => {
    const policy = await Policy.findOneAndUpdate({}, req.body, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
    });
    res.json(policy);
});

module.exports = {
    getPolicies,
    updatePolicies
};
