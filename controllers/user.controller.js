const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');


// @desc    Obtener todos los usuarios
// @route   GET /api/users
// @access  Privado/Admin
const getUsers = asyncHandler(async (req, res) => {
    // Opción: ¿Filtrar usuarios inactivos? Usualmente los admins quieren ver todos
    const users = await User.find({});
    res.json(users);
});

// @desc    Obtener un usuario
// @route   GET /api/users/:id
// @access  Privado/Admin
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
});

// @desc    Actualizar usuario
// @route   PUT /api/users/:id
// @access  Privado/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        // Admin solo puede modificar rol y estado
        user.role = req.body.role || user.role;

        // Admin puede reactivar usuario
        if (req.body.isActive !== undefined) {
            user.isActive = req.body.isActive;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            isActive: updatedUser.isActive
        });
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
});

// @desc    Eliminar usuario (Soft delete por defecto)
// @route   DELETE /api/users/:id?permanent=true
// @access  Privado/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }

    // Revisar query param para eliminación permanente
    if (req.query.permanent === 'true') {
        await user.deleteOne();
        res.json({ message: 'Usuario eliminado permanentemente' });
    } else {
        // Soft delete
        user.isActive = false;
        await user.save();
        res.json({ message: 'Usuario desactivado' });
    }
});

// @desc    Actualizar perfil de usuario
// @route   PUT /api/users/profile
// @access  Privado
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // Verificar contraseña actual para cualquier cambio
        if (req.body.currentPassword && (await user.matchPassword(req.body.currentPassword))) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.image = req.body.image || user.image;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            });
        } else {
            res.status(401);
            throw new Error('Contraseña actual inválida. Se requiere para guardar cambios.');
        }
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
});

// @desc    Actualizar contraseña de usuario
// @route   PUT /api/users/password
// @access  Privado
const updateUserPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user && (await user.matchPassword(req.body.currentPassword))) {
        user.password = req.body.newPassword;
        await user.save();
        res.json({ message: 'Contraseña actualizada' });
    } else {
        res.status(401);
        throw new Error('Contraseña actual inválida');
    }
});

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    updateUserProfile,
    updateUserPassword,
};
