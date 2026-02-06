const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const generateToken = require('../utils/generateToken');
const sendEmail = require('../services/emailService');

// Auxiliar para enviar token en cookie
const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id);

    const options = {
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 días
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                // token: token, // Opcional: remover token del body si se usan solo cookies
            },
        });
};

// @desc    Autenticar usuario & obtener token
// @route   POST /api/auth/login
// @access  Público
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        if (user.isActive === false) {
            res.status(401);
            throw new Error('La cuenta de usuario está desactivada. Contacte al administrador.');
        }
        sendTokenResponse(user, 200, res);
    } else {
        res.status(401);
        throw new Error('Email o contraseña inválidos');
    }
});

// @desc    Obtener usuario logueado actual
// @route   GET /api/auth/me
// @access  Privado
const getMe = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
    };
    res.status(200).json(user);
});

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Público
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('El usuario ya existe');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        sendTokenResponse(user, 201, res);
    } else {
        res.status(400);
        throw new Error('Datos de usuario inválidos');
    }
});

// @desc    Desloguear usuario / limpiar cookie
// @route   POST /api/auth/logout
// @access  Público
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({ success: true, data: {} });
});

// @desc    Olvidé mi contraseña
// @route   POST /api/auth/forgotpassword
// @access  Público
const forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(404);
        throw new Error('No existe un usuario con ese email');
    }

    // Obtener token de reseteo
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Crear url de reseteo
    const resetUrl = `${req.protocol}://${req.get(
        'host'
    )}/api/auth/resetpassword/${resetToken}`;

    const message = `Recibiste este correo porque tú (o alguien más) solicitó recuperar la contraseña. Por favor haz una petición PUT a: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Token de recuperación de contraseña',
            message,
        });

        res.status(200).json({ success: true, data: 'Email enviado' });
    } catch (err) {
        console.error(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        res.status(500);
        throw new Error('El email no pudo ser enviado');
    }
});

// @desc    Restablecer contraseña
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Público
const resetPassword = asyncHandler(async (req, res, next) => {
    // Obtener token hasheado
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error('Token inválido');
    }

    // Establecer nueva contraseña
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, res);
});

module.exports = {
    loginUser,
    getMe,
    registerUser,
    logoutUser,
    forgotPassword,
    resetPassword,
};
