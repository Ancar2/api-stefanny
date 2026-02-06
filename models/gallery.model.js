const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String, // Para la parte trasera de la carta
        },
        category: {
            type: String,
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

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
