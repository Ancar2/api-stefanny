const asyncHandler = require('express-async-handler');
const Message = require('../models/message.model');
const sendEmail = require('../services/emailService');

// @desc    Enviar mensaje de contacto (Público)
// @route   POST /api/contact
// @access  Público
const createMessage = asyncHandler(async (req, res) => {
    const { name, email, subject, message, phone } = req.body;

    const newMessage = await Message.create({
        name,
        email,
        subject,
        message,
        phone
    });

    // 1. Responder al cliente de inmediato
    res.status(201).json({
        success: true,
        message: 'Mensaje enviado correctamente',
        data: newMessage
    });

    // 2. Enviar notificación por email a todos los administradores (Async/Fire-and-forget)
    // No usamos await aquí para no bloquear o depender de la velocidad del SMTP si ya respondimos
    try {
        const User = require('../models/user.model');
        const admins = await User.find({ role: 'admin' });

        if (admins.length > 0) {
            const emailPromises = admins.map(admin => {
                return sendEmail({
                    email: admin.email,
                    subject: `Nuevo Mensaje de Contacto: ${subject}`,
                    message: `Hola ${admin.name},\n\nHas recibido un nuevo mensaje de contacto desde el portafolio.\n\nDe: ${name} (${email})\nTeléfono: ${req.body.phone || 'No especificado'}\n\nMensaje:\n${message}`
                });
            });

            // Usamos Promise.all pero capturamos error para no crashear proceso no controlado (aunque express ya respondió)
            Promise.all(emailPromises)
                .then(() => console.log(`Notificación enviada a ${admins.length} administradores.`))
                .catch(err => console.error('Error enviando emails:', err));
        }
    } catch (error) {
        console.error('Error buscando admins para notificar:', error);
    }
});

// @desc    Obtener mensajes (Admin)
// @route   GET /api/admin/messages
// @access  Privado/Admin
const getAdminMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
});

// @desc    Marcar mensaje como leído (Admin)
// @route   PATCH /api/admin/messages/:id/read
// @access  Privado/Admin
const markAsRead = asyncHandler(async (req, res) => {
    const msg = await Message.findById(req.params.id);

    if (msg) {
        msg.read = true;
        await msg.save();
        res.json(msg);
    } else {
        res.status(404);
        throw new Error('Mensaje no encontrado');
    }
});
// @desc    Eliminar mensaje (Admin)
// @route   DELETE /api/admin/messages/:id
// @access  Privado/Admin
const deleteMessage = asyncHandler(async (req, res) => {
    const msg = await Message.findById(req.params.id);

    if (msg) {
        await msg.deleteOne();
        res.json({ message: 'Mensaje eliminado' });
    } else {
        res.status(404);
        throw new Error('Mensaje no encontrado');
    }
});

module.exports = {
    createMessage,
    getAdminMessages,
    markAsRead,
    deleteMessage
};
