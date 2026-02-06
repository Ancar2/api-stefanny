const asyncHandler = require('express-async-handler');
const Testimonial = require('../models/testimonial.model');

// @desc    Obtener testimonios aprobados (Público)
// @route   GET /api/testimonials
// @access  Público
const getPublicTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
    res.json(testimonials);
});

// @desc    Crear testimonio (Público)
// @route   POST /api/testimonials
// @access  Público
const createTestimonial = asyncHandler(async (req, res) => {
    const { name, roleOrContext, message, rating, image } = req.body;

    const testimonial = await Testimonial.create({
        name,
        roleOrContext,
        message,
        rating,
        image,
        approved: false // Por defecto requiere moderación
    });

    res.status(201).json({
        success: true,
        message: 'Testimonio enviado para moderación',
        data: testimonial
    });
});

// @desc    Obtener todos los testimonios (Admin)
// @route   GET /api/admin/testimonials
// @access  Privado/Admin
const getAdminTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json(testimonials);
});

// @desc    Aprobar testimonio (Admin)
// @route   PATCH /api/admin/testimonials/:id/approve
// @access  Privado/Admin
const approveTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
        testimonial.approved = true;
        await testimonial.save();
        res.json(testimonial);
    } else {
        res.status(404);
        throw new Error('Testimonio no encontrado');
    }
});

// @desc    Rechazar/Eliminar testimonio (Admin)
// @route   DELETE /api/admin/testimonials/:id
// @access  Privado/Admin
const deleteTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
        await testimonial.deleteOne();
        res.json({ message: 'Testimonio eliminado' });
    } else {
        res.status(404);
        throw new Error('Testimonio no encontrado');
    }
});

module.exports = {
    getPublicTestimonials,
    createTestimonial,
    getAdminTestimonials,
    approveTestimonial,
    deleteTestimonial
};
