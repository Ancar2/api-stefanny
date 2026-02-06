const mongoose = require('mongoose');

const SeccionOneSchema = new mongoose.Schema({
    // Glass Panel Container Configuration
    glassPanelConfig: {
        // Desktop
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        width: { type: Number, default: 45 }, // percentage
        height: { type: String, default: 'auto' },
        zIndex: { type: Number, default: 50 },
        padding: { type: String, default: '3vmin' },
        marginRight: { type: String, default: '-5vmin' },
        marginTop: { type: String, default: '30vh' },

        // Mobile
        mobileX: { type: Number, default: 0 },
        mobileY: { type: Number, default: 0 },
        mobileWidth: { type: Number, default: 90 },
        mobileHeight: { type: String, default: 'auto' },
        mobileZIndex: { type: Number, default: 50 },
        mobilePadding: { type: String, default: '2rem' },
        mobileMarginRight: { type: String, default: '0' },
        mobileMarginTop: { type: String, default: '0' }
    },

    // Profession Subtitle Configuration
    professionConfig: {
        // Desktop
        fontSize: { type: Number, default: 2.5 }, // vmin
        textAlign: { type: String, default: 'left' },
        color: { type: String, default: 'var(--color-primario)' },
        letterSpacing: { type: String, default: '0.5vmin' },
        marginBottom: { type: String, default: '5vmin' },

        // Mobile
        mobileFontSize: { type: Number, default: 3.5 }, // vmin
        mobileTextAlign: { type: String, default: 'left' },
        mobileLetterSpacing: { type: String, default: '0.3vmin' },
        mobileMarginBottom: { type: String, default: '3vmin' }
    },

    // Section Title Configuration
    titleConfig: {
        // Desktop
        fontSize: { type: Number, default: 10 }, // vmin
        textAlign: { type: String, default: 'left' },
        lineHeight: { type: Number, default: 0.8 },
        letterSpacing: { type: String, default: '-0.5vmin' },
        marginBottom: { type: String, default: '3vmin' },

        // Mobile
        mobileFontSize: { type: Number, default: 12 }, // vw
        mobileTextAlign: { type: String, default: 'left' },
        mobileLineHeight: { type: Number, default: 0.9 },
        mobileLetterSpacing: { type: String, default: '-2px' },
        mobileMarginBottom: { type: String, default: '2vmin' }
    },

    // Description Text Configuration
    descriptionConfig: {
        // Desktop
        fontSize: { type: Number, default: 1.8 }, // vmin
        textAlign: { type: String, default: 'left' },
        lineHeight: { type: Number, default: 1.6 },
        paddingLeft: { type: String, default: '2vmin' },
        marginLeft: { type: String, default: '0.5vmin' },

        // Mobile
        mobileFontSize: { type: Number, default: 2.2 }, // vmin
        mobileTextAlign: { type: String, default: 'left' },
        mobileLineHeight: { type: Number, default: 1.5 },
        mobilePaddingLeft: { type: String, default: '1.5vmin' },
        mobileMarginLeft: { type: String, default: '0' }
    },

    // Social Footer Configuration
    socialConfig: {
        // Desktop
        fontSize: { type: Number, default: 1.2 }, // vmin for text
        iconSize: { type: Number, default: 2.5 }, // vmin for icons
        marginTop: { type: String, default: '5vmin' },
        gap: { type: String, default: '2vmin' },

        // Mobile
        mobileFontSize: { type: Number, default: 1.5 },
        mobileIconSize: { type: Number, default: 3 },
        mobileMarginTop: { type: String, default: '4vmin' },
        mobileGap: { type: String, default: '1.5vmin' }
    },

    // Image Wrapper Configuration
    imageConfig: {
        // Desktop
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        width: { type: Number, default: 57 }, // vmin
        maxWidth: { type: String, default: '57vmin' },
        marginTop: { type: String, default: '-13vmin' },
        zIndex: { type: Number, default: 5 },

        // Mobile
        mobileX: { type: Number, default: 0 },
        mobileY: { type: Number, default: 0 },
        mobileWidth: { type: Number, default: 80 }, // vw
        mobileMaxWidth: { type: String, default: '80vw' },
        mobileMarginTop: { type: String, default: '0' },
        mobileZIndex: { type: Number, default: 5 }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SeccionOne', SeccionOneSchema);
