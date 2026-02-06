const mongoose = require('mongoose');

const dynamicContentSchema = new mongoose.Schema({
    key: {
        type: String,
        required: [true, 'El key es requerido'],
        unique: true,
        trim: true
    },
    type: {
        type: String,
        required: [true, 'El tipo es requerido'],
        enum: ['text', 'text_array', 'image_array'],
        default: 'text'
    },
    label: {
        type: String,
        required: [true, 'El label es requerido'],
        trim: true
    },
    section: {
        type: String,
        required: [true, 'La sección es requerida'],
        trim: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'El valor es requerido']
    },
    active: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Índices para búsquedas eficientes
dynamicContentSchema.index({ section: 1, active: 1 });
dynamicContentSchema.index({ key: 1 });

module.exports = mongoose.model('DynamicContent', dynamicContentSchema);
