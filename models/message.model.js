const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true
        },
        subject: {// titulo
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        read: {
            type: Boolean,
            default: false
        },
        phone: {
            type: String,
            required: false
        },

    },
    {
        timestamps: true
    }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
