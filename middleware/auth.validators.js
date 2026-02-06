const { check } = require('express-validator');

// Reglas de validación para Auth
const loginValidation = [
    check('email', 'Por favor incluye un email válido').isEmail(),
    check('password', 'La contraseña es requerida').exists(),
];

const registerValidation = [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'Por favor incluye un email válido').isEmail(),
    check('password', 'La contraseña debe tener 6 o más caracteres').isLength({
        min: 6,
    }),
];

module.exports = {
    loginValidation,
    registerValidation
};
