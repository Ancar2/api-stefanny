const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            default: 'Nombre Profesional'
        },
        professionTitle: {
            type: String,
            required: true,
            default: 'Mi Profesión'
        },
        description: {
            type: String,
            default: 'Aquí va una descripción detallada sobre mi trayectoria y experiencia.'
        },
        profileImage: {
            type: String,
            default: ''
        },
        experienceYears: {
            type: Number,
            default: 0
        },
        whatsapp: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        certificates: [{
            type: String // URL de la imagen
        }],
        socialNetworks: {
            instagram: { type: String, default: '' },
            facebook: { type: String, default: '' },
            linkedin: { type: String, default: '' },
            twitter: { type: String, default: '' },
            tiktok: { type: String, default: '' }
        }
    },
    {
        timestamps: true
    }
);


const About = mongoose.model('About', aboutSchema);

module.exports = About;
