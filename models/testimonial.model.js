const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        roleOrContext: {
            type: String, // Ej: "Cliente", "Evento Corporativo"
            required: true
        },
        image: {
            type: String,
            required: true // Profile photo is mandatory
        },
        message: {
            type: String,
            required: true
        },
        rating: {
            type: Number, // 1-5
            min: 1,
            max: 5
        },
        approved: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
