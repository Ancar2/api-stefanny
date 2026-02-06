const asyncHandler = require('express-async-handler');
const Product = require('../models/product.model');

// @desc    Obtener productos (Público)
// @route   GET /api/products
// @access  Público
const getPublicProducts = asyncHandler(async (req, res) => {
    // Buscar los productos. Como 'select: false' está en el modelo,
    // los campos privados NO vendrán por defecto.
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.json(products);
});

// @desc    Obtener detalle de producto (Público)
// @route   GET /api/products/:id
// @access  Público
const getPublicProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
});

// @desc    Obtener productos (Admin - Completo)
// @route   GET /api/admin/products
// @access  Privado/Admin
const getAdminProducts = asyncHandler(async (req, res) => {
    // Aquí usamos .select('+campo') para traer los campos ocultos
    const products = await Product.find({})
        .select('+glass +technique +garnish +decoration +recipeSteps +adminNotes')
        .sort({ createdAt: -1 });

    res.json(products);
    res.json(products);
});

// @desc    Obtener producto por ID (Admin)
// @route   GET /api/admin/products/:id
// @access  Privado/Admin
const getAdminProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
});

// @desc    Crear producto
// @route   POST /api/admin/products
// @access  Privado/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
});

// @desc    Actualizar producto
// @route   PUT /api/admin/products/:id
// @access  Privado/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('+glass +technique +garnish +decoration +recipeSteps +adminNotes');

        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
});

// @desc    Eliminar producto
// @route   DELETE /api/admin/products/:id
// @access  Privado/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
});

module.exports = {
    getPublicProducts,
    getPublicProductById,
    getAdminProducts,
    getAdminProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
