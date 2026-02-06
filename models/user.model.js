const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Por favor agrega un nombre'],
        },
        email: {
            type: String,
            required: [true, 'Por favor agrega un email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Por favor agrega un email válido',
            ],
        },
        password: {
            type: String,
            required: [true, 'Por favor agrega una contraseña'],
        },
        phone: {
            type: String,
            required: false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user', // Por defecto usuario, cambio a admin manual o por seed
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Encriptar contraseña usando bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Comparar contraseña ingresada con la encriptada en base de datos
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generar y hashear token de reseteo de contraseña
userSchema.methods.getResetPasswordToken = function () {
    // Generar token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hashear token y guardarlo en el campo resetPasswordToken
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Establecer expiración (10 minutos)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
