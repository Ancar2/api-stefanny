const mongoose = require('mongoose');

const SeccionTwoSchema = new mongoose.Schema({
    // Preview Container Configuration
    previewContainerConfig: {
        // Desktop
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        width: { type: Number, default: 600 }, // max-width in px
        height: { type: Number, default: 70 }, // vh
        padding: { type: String, default: '3vmin' },

        // Mobile
        mobileX: { type: Number, default: 0 },
        mobileY: { type: Number, default: 0 },
        mobileWidth: { type: Number, default: 90 }, // percentage
        mobileHeight: { type: Number, default: 60 }, // vh
        mobilePadding: { type: String, default: '2vmin' }
    },

    // Section Title Configuration
    sectionTitleConfig: {
        // Desktop
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        width: { type: Number, default: 100 }, // percentage
        fontSize: { type: Number, default: 8 }, // vmin
        textAlign: { type: String, default: 'right' },
        marginBottom: { type: String, default: '4vmin' },

        // Mobile
        mobileX: { type: Number, default: 0 },
        mobileY: { type: Number, default: 0 },
        mobileWidth: { type: Number, default: 100 }, // percentage
        mobileFontSize: { type: Number, default: 10 }, // vmin
        mobileTextAlign: { type: String, default: 'center' },
        mobileMarginBottom: { type: String, default: '5vmin' }
    },

    // Preview Content Title Configuration
    previewTitleConfig: {
        // Desktop
        fontSize: { type: Number, default: 4 }, // vmin
        marginBottom: { type: String, default: '2vmin' },

        // Mobile
        mobileFontSize: { type: Number, default: 5 }, // vmin
        mobileMarginBottom: { type: String, default: '2vmin' }
    },

    // Preview Text Configuration
    previewTextConfig: {
        // Desktop
        fontSize: { type: Number, default: 1.2 }, // rem
        lineHeight: { type: Number, default: 1.6 },

        // Mobile
        mobileFontSize: { type: Number, default: 1.1 }, // rem
        mobileLineHeight: { type: Number, default: 1.5 }
    },

    // Style Grid Container Configuration
    styleGridConfig: {
        // Desktop
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        width: { type: Number, default: 100 }, // percentage
        height: { type: Number, default: 0 }, // auto if 0
        gridGap: { type: String, default: '3vmin' },
        columns: { type: Number, default: 2 },

        // Mobile
        mobileX: { type: Number, default: 0 },
        mobileY: { type: Number, default: 0 },
        mobileWidth: { type: Number, default: 100 }, // percentage
        mobileHeight: { type: Number, default: 0 }, // auto if 0
        mobileGridGap: { type: String, default: '2vmin' },
        mobileColumns: { type: Number, default: 2 }
    },

    // Style Card Configuration
    styleCardConfig: {
        // Desktop
        padding: { type: String, default: '3vmin' },
        iconSize: { type: Number, default: 5 }, // vmin
        titleFontSize: { type: Number, default: 2.5 }, // vmin
        excerptFontSize: { type: Number, default: 1.5 }, // vmin

        // Mobile
        mobilePadding: { type: String, default: '2.5vmin' },
        mobileIconSize: { type: Number, default: 6 }, // vmin
        mobileTitleFontSize: { type: Number, default: 3 }, // vmin
        mobileExcerptFontSize: { type: Number, default: 1.8 } // vmin
    },

    // Main Container Configuration
    mainContainerConfig: {
        // Desktop
        paddingTop: { type: String, default: '5vmin' },
        paddingRight: { type: String, default: '5vmin' },
        paddingBottom: { type: String, default: '5vmin' },
        paddingLeft: { type: String, default: '5vmin' },

        // Mobile
        mobilePaddingTop: { type: String, default: '5vmin' },
        mobilePaddingRight: { type: String, default: '3vmin' },
        mobilePaddingBottom: { type: String, default: '5vmin' },
        mobilePaddingLeft: { type: String, default: '3vmin' }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SeccionTwo', SeccionTwoSchema);
