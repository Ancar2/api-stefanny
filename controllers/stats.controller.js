const asyncHandler = require('express-async-handler');
const Message = require('../models/message.model');
const Product = require('../models/product.model');
const Testimonial = require('../models/testimonial.model');
const Visit = require('../models/visit.model');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    // 1. Unread Messages count
    const unreadMessagesCount = await Message.countDocuments({ read: false });

    // 2. Pending Testimonials count
    const pendingTestimonialsCount = await Testimonial.countDocuments({ approved: false });

    // 3. Total Products count
    const productsCount = await Product.countDocuments({});

    // 4. Visits Today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const visitsCount = await Visit.countDocuments({
        timestamp: { $gte: startOfDay, $lte: endOfDay }
    });

    // 5. Visits Yesterday (for comparison)
    const startOfYesterday = new Date(startOfDay);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    const endOfYesterday = new Date(endOfDay);
    endOfYesterday.setDate(endOfYesterday.getDate() - 1);

    const visitsYesterday = await Visit.countDocuments({
        timestamp: { $gte: startOfYesterday, $lte: endOfYesterday }
    });

    let visitPercentage = 0;
    if (visitsYesterday > 0) {
        visitPercentage = ((visitsCount - visitsYesterday) / visitsYesterday) * 100;
    } else if (visitsCount > 0) {
        visitPercentage = 100; // If yesterday was 0 and today > 0, it's 100% increase (or Infinity effectively)
    }

    res.json({
        unreadMessages: unreadMessagesCount,
        pendingTestimonials: pendingTestimonialsCount,
        totalProducts: productsCount,
        visitsToday: visitsCount,
        visitPercentage: Math.round(visitPercentage)
    });
});

// @desc    Record a new visit
// @route   POST /api/visits
// @access  Public
const recordVisit = asyncHandler(async (req, res) => {
    const { ip, userAgent } = req.body;

    await Visit.create({
        ip: ip || req.ip,
        userAgent: userAgent || req.get('User-Agent')
    });

    res.status(201).json({ message: 'Visit recorded' });
});

module.exports = {
    getDashboardStats,
    recordVisit
};
