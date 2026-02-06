const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        icon: {
            type: String, // Puede ser un nombre de clase css o una url
        },
        image: {
            type: String, // URL de imagen o video (opcional)
            required: false
        },
        price: {
            type: Number,
            default: 0
        },
        featured: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
