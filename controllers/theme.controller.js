const asyncHandler = require('express-async-handler');
const DashboardTheme = require('../models/theme.model');

// @desc    Obtener tema del dashboard del usuario
// @route   GET /api/admin/theme
// @access  Privado/Admin
const getTheme = asyncHandler(async (req, res) => {
    let theme = await DashboardTheme.findOne({ userId: req.user._id });

    // Si no existe, crear uno con valores por defecto
    if (!theme) {
        theme = await DashboardTheme.create({ userId: req.user._id });
    }

    res.json(theme);
});

// @desc    Actualizar tema del dashboard
// @route   PUT /api/admin/theme
// @access  Privado/Admin
const updateTheme = asyncHandler(async (req, res) => {
    const {
        sidebarBgColor,
        sidebarTextColor,
        sidebarActiveColor,
        sidebarTitleColor,
        mainBgColor,
        mainBgImage,
        primaryFont,
        titleColor,
        subtitleColor,
        textColor,
        topbarBgColor,
        topbarTextColor,
        hamburgerColor,
        hamburgerBgColor
    } = req.body;

    let theme = await DashboardTheme.findOne({ userId: req.user._id });

    if (theme) {
        // Actualizar existente
        theme.sidebarBgColor = sidebarBgColor || theme.sidebarBgColor;
        theme.sidebarTextColor = sidebarTextColor || theme.sidebarTextColor;
        theme.sidebarActiveColor = sidebarActiveColor || theme.sidebarActiveColor;
        theme.sidebarTitleColor = sidebarTitleColor || theme.sidebarTitleColor;
        theme.mainBgColor = mainBgColor || theme.mainBgColor;
        theme.mainBgImage = mainBgImage !== undefined ? mainBgImage : theme.mainBgImage;
        theme.primaryFont = primaryFont || theme.primaryFont;
        theme.titleColor = titleColor || theme.titleColor;
        theme.subtitleColor = subtitleColor || theme.subtitleColor;
        theme.textColor = textColor || theme.textColor;
        theme.topbarBgColor = topbarBgColor || theme.topbarBgColor;
        theme.topbarTextColor = topbarTextColor || theme.topbarTextColor;
        theme.hamburgerColor = hamburgerColor || theme.hamburgerColor;
        theme.hamburgerBgColor = hamburgerBgColor !== undefined ? hamburgerBgColor : theme.hamburgerBgColor;

        const updatedTheme = await theme.save();
        res.json(updatedTheme);
    } else {
        // Crear nuevo
        const newTheme = await DashboardTheme.create({
            userId: req.user._id,
            ...req.body
        });
        res.status(201).json(newTheme);
    }
});

module.exports = {
    getTheme,
    updateTheme
};
