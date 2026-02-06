const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');


const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Verificar token en cookies (Preferido)
    if (req.cookies.token) {
        token = req.cookies.token;
    }
    // Fallback a token Bearer en header (Soporte opcional para clientes móviles/otros)
    else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error('No autorizado, no hay token');
    }

    try {
        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Obtener usuario del token
        req.user = await User.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        res.status(401);
        throw new Error('No autorizado, token fallido');
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('No autorizado como administrador');
    }
};

module.exports = { protect, admin };
