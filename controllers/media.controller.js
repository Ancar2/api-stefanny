const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2;

// @desc    Obtener lista de archivos de Cloudinary
// @route   GET /api/admin/media
// @access  Privado/Admin
const getMediaLibrary = asyncHandler(async (req, res) => {
    const { type = 'image', max_results = 50, next_cursor } = req.query;

    try {
        const options = {
            resource_type: type,
            max_results: parseInt(max_results),
            type: 'upload',
            prefix: 'steffany-portfolio/' // Filtrar por carpeta específica
        };

        if (next_cursor) {
            options.next_cursor = next_cursor;
        }

        const result = await cloudinary.api.resources(options);

        res.json({
            resources: result.resources,
            next_cursor: result.next_cursor || null,
            total_count: result.total_count
        });
    } catch (error) {
        res.status(500);
        throw new Error('Error al obtener archivos de Cloudinary');
    }
});

// @desc    Eliminar archivo de Cloudinary
// @route   DELETE /api/admin/media/:publicId
// @access  Privado/Admin
const deleteMedia = asyncHandler(async (req, res) => {
    const { publicId, resource_type = 'image' } = req.query;

    if (!publicId) {
        res.status(400);
        throw new Error('Public ID es requerido');
    }

    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type
        });

        if (result.result === 'ok') {
            res.json({ message: 'Archivo eliminado correctamente' });
        } else {
            res.status(404);
            throw new Error('Archivo no encontrado');
        }
    } catch (error) {
        res.status(500);
        throw new Error('Error al eliminar archivo de Cloudinary');
    }
});

module.exports = {
    getMediaLibrary,
    deleteMedia
};
