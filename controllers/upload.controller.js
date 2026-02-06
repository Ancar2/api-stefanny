const asyncHandler = require('express-async-handler');
const fs = require('fs').promises;
const path = require('path');

// @desc    Subir archivo a Cloudinary
// @route   POST /api/upload
// @access  Privado/Admin
const uploadFile = asyncHandler(async (req, res) => {
    console.log('Upload request received');
    console.log('File:', req.file);

    if (req.file && req.file.path) {
        console.log('File uploaded successfully to:', req.file.path);
        res.json({ url: req.file.path });
    } else {
        console.error('Upload failed - no file or path');
        res.status(400);
        throw new Error('No se pudo subir la imagen');
    }
});

// @desc    Obtener lista de archivos locales
// @route   GET /api/admin/local-files
// @access  Privado/Admin
const getLocalFiles = asyncHandler(async (req, res) => {
    const uploadsDir = path.join(__dirname, '../uploads');

    try {
        // Verificar que el directorio existe
        await fs.access(uploadsDir);

        const files = await fs.readdir(uploadsDir);

        const fileDetails = await Promise.all(
            files
                .filter(filename => filename !== '.gitkeep') // Ignorar .gitkeep
                .map(async (filename) => {
                    const filePath = path.join(uploadsDir, filename);
                    const stats = await fs.stat(filePath);

                    // Determinar tipo de archivo
                    const ext = path.extname(filename).toLowerCase();
                    let format = ext.replace('.', '');

                    return {
                        filename,
                        public_id: filename, // Para compatibilidad con el frontend
                        secure_url: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
                        url: `${req.protocol}://${req.get('host')}/uploads/${filename}`, // Same as secure_url
                        bytes: stats.size,
                        created_at: stats.birthtime,
                        format: format,
                        resource_type: 'raw',
                        type: 'upload', // For compatibility
                        source: 'local'
                    };
                })
        );

        res.json({ files: fileDetails });
    } catch (error) {
        console.error('Error reading uploads directory:', error);
        res.json({ files: [] }); // Retornar array vacío si hay error
    }
});

// @desc    Eliminar archivo local
// @route   DELETE /api/admin/local-files/:filename
// @access  Privado/Admin
const deleteLocalFile = asyncHandler(async (req, res) => {
    const { filename } = req.params;

    // Validación de seguridad: prevenir path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        res.status(400);
        throw new Error('Nombre de archivo inválido');
    }

    const uploadsDir = path.join(__dirname, '../uploads');
    const filePath = path.join(uploadsDir, filename);

    try {
        // Verificar que el archivo existe
        await fs.access(filePath);

        // Eliminar archivo
        await fs.unlink(filePath);

        res.json({ message: 'Archivo eliminado correctamente' });
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404);
            throw new Error('Archivo no encontrado');
        }
        res.status(500);
        throw new Error('Error al eliminar archivo');
    }
});

module.exports = {
    uploadFile,
    getLocalFiles,
    deleteLocalFile
};
