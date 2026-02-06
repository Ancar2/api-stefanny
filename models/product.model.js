const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Por favor agrega un nombre'],
            trim: true
        },
        description: {
            type: String,
            // Descripción sensorial (pública)
        },
        image: {
            type: String, // URL imagen del cóctel
        },
        category: {
            type: String,
            // autor, clásico, molecular, etc.
        },
        price: {
            type: Number,
            default: 0
        },
        featured: {
            type: Boolean,
            default: false
        },
        link: {
            type: String, // Enlace de visita (opcional)
        },
        // � INFORMACIÓN DINÁMICA (Generalizada)
        dataItems: [
            {
                key: {
                    type: String, // Nombre del dato (ej: "Copa", "Técnica", "Ingredientes")
                    required: true
                },
                value: {
                    type: mongoose.Schema.Types.Mixed, // Puede ser texto, número, etc.
                    required: true
                },
                type: {
                    type: String,
                    enum: ['text', 'number', 'list', 'boolean'],
                    default: 'text'
                },
                isPublic: {
                    type: Boolean,
                    default: true // Por defecto público, admin puede ocultarlo
                }
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', cocktailSchema);

module.exports = Product;

