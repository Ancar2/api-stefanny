const mongoose = require('mongoose');

const heroSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: 'Portafolio Profesional'
        },
        subtitle: {
            type: String,
            default: 'Bienvenido a mi sitio web'
        },
        ctaText: {
            type: String,
            default: 'Contáctame'
        },
        backgroundMedia: {
            type: String, // URL de imagen o video
            default: ''
        },
        backgroundFixed: {
            type: Boolean, // Si es true, el fondo queda fijo (efecto parallax)
            default: false
        },
        showModel3d: {
            type: Boolean,
            default: false
        },
        model3dUrl: {
            type: String, // URL del archivo .glb/.gltf
            default: ''
        },
        navbarLogo: {
            type: String,
            default: ''
        },
        navbarLogoConfig: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number, default: 75 },
            height: { type: Number, default: null }, // Auto
            unit: { type: String, default: 'px' },
            // Mobile Specifics
            mobileX: { type: Number, default: 0 },
            mobileY: { type: Number, default: 0 },
            mobileWidth: { type: Number, default: 90 }
        },
        navbarTextConfig: {
            fontSize: { type: Number, default: 1.0 }, // 1.0vw default
            unit: { type: String, default: 'vw' }
        },
        navbarCtaConfig: {
            fontSize: { type: Number, default: 1.0 }, // 1.0vw default
            unit: { type: String, default: 'vw' }
        },
        navbarCtaText: {
            type: String,
            default: 'Contacto'
        },
        navLinks: [{
            label: String,
            url: String // puede ser ruta /... o ancla #...
        }],
        texto: {
            type: String, // Frase o texto adicional (ej. quote)
            default: '"Frase o texto adicional "'
        },
        imagenUno: {
            type: String,
            default: ''
        },
        imagenUnoConfig: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number, default: 300 }, // Default px or %
            height: { type: Number, default: 400 },
            unit: { type: String, default: 'px' }, // 'px' or '%'
            zIndex: { type: Number, default: 10 },
            // Mobile
            mobileX: { type: Number, default: 0 },
            mobileY: { type: Number, default: 0 },
            mobileWidth: { type: Number, default: 90 },
            mobileHeight: { type: Number, default: null },
            mobileUnit: { type: String, default: '%' },
            mobileZIndex: { type: Number, default: 10 }
        },
        imagenDos: {
            type: String,
            default: ''
        },
        imagenDosConfig: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number, default: 300 },
            height: { type: Number, default: 400 },
            unit: { type: String, default: 'px' },
            zIndex: { type: Number, default: 10 },
            // Mobile
            mobileX: { type: Number, default: 0 },
            mobileY: { type: Number, default: 0 },
            mobileWidth: { type: Number, default: 90 },
            mobileHeight: { type: Number, default: null },
            mobileUnit: { type: String, default: '%' },
            mobileZIndex: { type: Number, default: 10 }
        },

        // Text Elements Config
        titleConfig: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number, default: null },
            height: { type: Number, default: null },
            fontSize: { type: Number, default: null }, // Font Size
            unit: { type: String, default: 'px' },
            zIndex: { type: Number, default: 20 },
            textAlign: { type: String, default: 'center', enum: ['left', 'center', 'right'] },
            // Mobile
            mobileX: { type: Number, default: 0 },
            mobileY: { type: Number, default: 0 },
            mobileFontSize: { type: Number, default: null },
            mobileTextAlign: { type: String, default: 'center' },
            mobileWidth: { type: Number, default: null },
            mobileHeight: { type: Number, default: null },
            mobileZIndex: { type: Number, default: 20 }
        },
        subtitleConfig: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number, default: null },
            height: { type: Number, default: null },
            fontSize: { type: Number, default: null },
            unit: { type: String, default: 'px' },
            zIndex: { type: Number, default: 20 },
            textAlign: { type: String, default: 'center', enum: ['left', 'center', 'right'] },
            // Mobile
            mobileX: { type: Number, default: 0 },
            mobileY: { type: Number, default: 0 },
            mobileFontSize: { type: Number, default: null },
            mobileTextAlign: { type: String, default: 'center' },
            mobileWidth: { type: Number, default: null },
            mobileHeight: { type: Number, default: null },
            mobileZIndex: { type: Number, default: 20 }
        },
        textConfig: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number, default: null },
            height: { type: Number, default: null },
            fontSize: { type: Number, default: null },
            unit: { type: String, default: 'px' },
            zIndex: { type: Number, default: 20 },
            textAlign: { type: String, default: 'center', enum: ['left', 'center', 'right'] },
            // Mobile
            mobileX: { type: Number, default: 0 },
            mobileY: { type: Number, default: 0 },
            mobileFontSize: { type: Number, default: null },
            mobileTextAlign: { type: String, default: 'center' },
            mobileWidth: { type: Number, default: null },
            mobileHeight: { type: Number, default: null },
            mobileZIndex: { type: Number, default: 20 }
        },
        ctaConfig: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number, default: null },
            height: { type: Number, default: null },
            fontSize: { type: Number, default: null },
            unit: { type: String, default: 'px' },
            zIndex: { type: Number, default: 20 },
            textAlign: { type: String, default: 'center', enum: ['left', 'center', 'right'] },
            // Mobile
            mobileX: { type: Number, default: 0 },
            mobileY: { type: Number, default: 0 },
            mobileFontSize: { type: Number, default: null },
            mobileTextAlign: { type: String, default: 'center' },
            mobileWidth: { type: Number, default: null },
            mobileHeight: { type: Number, default: null },
            mobileZIndex: { type: Number, default: 20 }
        },

        // Fonts Config
        fontsConfig: {
            titulos: { type: String, default: "'Oswald', sans-serif" },
            subtitulos: { type: String, default: "'Oswald', sans-serif" },
            text: { type: String, default: "'Inter', sans-serif" },
            ctas: { type: String, default: "'Oswald', sans-serif" },
            navLinks: { type: String, default: "'Inter', sans-serif" }
        },

        // Colors Config
        colorsConfig: {
            primario: { type: String, default: '#d4af37' }, // Gold
            secundario: { type: String, default: '#000000' }, // Black
            auxiliar: { type: String, default: '#0d8a95' }, // Teal
            texto: { type: String, default: '#e5e5e5' }, // White/Grey
            textoSecundario: { type: String, default: '#aaaaaa' } // Muted
        },

        // Background Config
        backgroundConfig: {
            body: { type: String, default: 'transparent' },
            cta: { type: String, default: 'transparent' },
            card: { type: String, default: 'rgba(255, 255, 255, 0.03)' }
        },

        enlaceVisitaCtaNav: {
            type: String, // Link para el CTA del Navbar
            default: '#contact'
        },
        enlaceVisitaCta: {
            type: String, // Link para el CTA del Hero
            default: '#about'
        },
        // 3D Landmarks Configuration
        // 3D Landmarks Configuration
        model3dLandmarks: {
            hero: {
                x: { type: Number, default: 50 },
                y: { type: Number, default: 50 },
                scale: { type: Number, default: 1.2 },
                rotation: { type: String, default: '0deg' },
                orbit: { type: String, default: '0deg 90deg auto' },
                // Mobile
                mobileX: { type: Number, default: 50 },
                mobileY: { type: Number, default: 50 },
                mobileScale: { type: Number, default: 0.8 },
                mobileRotation: { type: String, default: '0deg' },
                mobileOrbit: { type: String, default: '0deg 90deg auto' }
            },
            'seccion-one': {
                x: { type: Number, default: 25 },
                y: { type: Number, default: 30 },
                scale: { type: Number, default: 0.9 },
                rotation: { type: String, default: '15deg' },
                orbit: { type: String, default: '-45deg 80deg auto' },
                // Mobile
                mobileX: { type: Number, default: 50 },
                mobileY: { type: Number, default: 30 },
                mobileScale: { type: Number, default: 0.6 },
                mobileRotation: { type: String, default: '0deg' },
                mobileOrbit: { type: String, default: '0deg 90deg auto' }
            },
            'seccion-two': {
                x: { type: Number, default: 75 },
                y: { type: Number, default: 50 },
                scale: { type: Number, default: 1.0 },
                rotation: { type: String, default: '-15deg' },
                orbit: { type: String, default: '45deg 80deg auto' },
                // Mobile
                mobileX: { type: Number, default: 50 },
                mobileY: { type: Number, default: 50 },
                mobileScale: { type: Number, default: 0.7 },
                mobileRotation: { type: String, default: '0deg' },
                mobileOrbit: { type: String, default: '0deg 80deg auto' }
            },
            'seccion-three': {
                x: { type: Number, default: 50 },
                y: { type: Number, default: 50 },
                scale: { type: Number, default: 0.8 },
                rotation: { type: String, default: '0deg' },
                orbit: { type: String, default: '0deg 75deg auto' },
                // Mobile
                mobileX: { type: Number, default: 50 },
                mobileY: { type: Number, default: 50 },
                mobileScale: { type: Number, default: 0.6 },
                mobileRotation: { type: String, default: '0deg' },
                mobileOrbit: { type: String, default: '0deg 90deg auto' }
            },
            'seccion-four': {
                x: { type: Number, default: 80 },
                y: { type: Number, default: 40 },
                scale: { type: Number, default: 0.9 },
                rotation: { type: String, default: '-30deg' },
                orbit: { type: String, default: '30deg 80deg auto' },
                // Mobile
                mobileX: { type: Number, default: 50 },
                mobileY: { type: Number, default: 40 },
                mobileScale: { type: Number, default: 0.7 },
                mobileRotation: { type: String, default: '0deg' },
                mobileOrbit: { type: String, default: '0deg 90deg auto' }
            },
            'seccion-five': {
                x: { type: Number, default: 50 },
                y: { type: Number, default: 20 },
                scale: { type: Number, default: 0.7 },
                rotation: { type: String, default: '0deg' },
                orbit: { type: String, default: '0deg 90deg auto' },
                // Mobile
                mobileX: { type: Number, default: 50 },
                mobileY: { type: Number, default: 20 },
                mobileScale: { type: Number, default: 0.6 },
                mobileRotation: { type: String, default: '0deg' },
                mobileOrbit: { type: String, default: '0deg 90deg auto' }
            }
        }
    },
    {
        timestamps: true
    }
);

// Patrón Singleton: Aseguraremos que solo haya 1 documento en el controlador
const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
