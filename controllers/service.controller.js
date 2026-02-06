const asyncHandler = require('express-async-handler');
const Service = require('../models/service.model');

// @desc    Obtener servicios activos (Público)
// @route   GET /api/services
// @access  Público
const getPublicServices = asyncHandler(async (req, res) => {
    const services = await Service.find({ active: true }).sort({ createdAt: -1 });
    res.json(services);
});

// @desc    Obtener TODOS los servicios (Admin)
// @route   GET /api/admin/services
// @access  Privado/Admin
const getAdminServices = asyncHandler(async (req, res) => {
    const services = await Service.find({}).sort({ createdAt: -1 });
    res.json(services);
});

// @desc    Obtener servicio por ID (Admin/Public)
// @route   GET /api/services/:id
// @access  Público (o restringir si es necesario)
const getServiceById = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (service) {
        res.json(service);
    } else {
        res.status(404);
        throw new Error('Servicio no encontrado');
    }
});

// @desc    Crear servicio (Admin)
// @route   POST /api/admin/services
// @access  Privado/Admin
const createService = asyncHandler(async (req, res) => {
    const service = await Service.create(req.body);
    res.status(201).json(service);
});

// @desc    Actualizar servicio (Admin)
// @route   PUT /api/admin/services/:id
// @access  Privado/Admin
const updateService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (service) {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedService);
    } else {
        res.status(404);
        throw new Error('Servicio no encontrado');
    }
});

// @desc    Eliminar servicio (Admin)
// @route   DELETE /api/admin/services/:id
// @access  Privado/Admin
const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (service) {
        await service.deleteOne();
        res.json({ message: 'Servicio eliminado' });
    } else {
        res.status(404);
        throw new Error('Servicio no encontrado');
    }
});

module.exports = {
    getPublicServices,
    getAdminServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};
