const mongoose = require('mongoose');

const dashboardThemeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    // Sidebar
    sidebarBgColor: {
        type: String,
        default: '#212529'
    },
    sidebarTextColor: {
        type: String,
        default: '#ffffff'
    },
    sidebarActiveColor: {
        type: String,
        default: '#0d6efd'
    },
    sidebarTitleColor: {
        type: String,
        default: '#ffffff'
    },

    // Main Content
    mainBgColor: {
        type: String,
        default: '#f8f9fa'
    },
    mainBgImage: {
        type: String,
        default: ''
    },

    // Typography
    primaryFont: {
        type: String,
        default: 'Inter',
        enum: ['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Open Sans', 'Lato', 'Playfair Display', 'Merriweather', 'Dancing Script', 'Pacifico', 'Great Vibes', 'Satisfy', 'Caveat', 'Raleway', 'Nunito', 'Ubuntu']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DashboardTheme', dashboardThemeSchema);
