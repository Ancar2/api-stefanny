const asyncHandler = require('express-async-handler');
const fs = require('fs').promises;
const path = require('path');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client, bucket, region } = require('../config/s3');

const sanitizeFileBase = (filename = 'file') => {
    const ext = path.extname(filename);
    const base = path.basename(filename, ext);
    return base.replace(/[^a-zA-Z0-9_-]/g, '_') || 'file';
};

const getPublicS3Url = (key) => {
    if (!bucket || !region) return null;
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

// @desc    Subir archivo a S3
// @route   POST /api/upload
// @access  Privado/Admin
const uploadFile = asyncHandler(async (req, res) => {
    if (!bucket || !region) {
        res.status(500);
        throw new Error('Configuración de S3 incompleta en variables de entorno');
    }

    if (!req.file || !req.file.buffer) {
        res.status(400);
        throw new Error('No se pudo subir el archivo');
    }

    const ext = path.extname(req.file.originalname || '').toLowerCase();
    const base = sanitizeFileBase(req.file.originalname);
    const key = `steffany-portfolio/${base}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    await s3Client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype || 'application/octet-stream'
    }));

    const url = getPublicS3Url(key);

    res.json({
        url,
        secure_url: url,
        key,
        public_id: key,
        resource_type: (req.file.mimetype || '').startsWith('video') ? 'video' : 'raw'
    });
});

// @desc    Obtener lista de archivos locales
// @route   GET /api/admin/local-files
// @access  Privado/Admin
const getLocalFiles = asyncHandler(async (req, res) => {
    const uploadsDir = path.join(__dirname, '../uploads');

    try {
        await fs.access(uploadsDir);

        const files = await fs.readdir(uploadsDir);

        const fileDetails = await Promise.all(
            files
                .filter(filename => filename !== '.gitkeep')
                .map(async (filename) => {
                    const filePath = path.join(uploadsDir, filename);
                    const stats = await fs.stat(filePath);

                    const ext = path.extname(filename).toLowerCase();
                    const format = ext.replace('.', '');

                    return {
                        filename,
                        public_id: filename,
                        secure_url: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
                        url: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
                        bytes: stats.size,
                        created_at: stats.birthtime,
                        format,
                        resource_type: 'raw',
                        type: 'upload',
                        source: 'local'
                    };
                })
        );

        res.json({ files: fileDetails });
    } catch (error) {
        console.error('Error reading uploads directory:', error);
        res.json({ files: [] });
    }
});

// @desc    Eliminar archivo local
// @route   DELETE /api/admin/local-files/:filename
// @access  Privado/Admin
const deleteLocalFile = asyncHandler(async (req, res) => {
    const { filename } = req.params;

    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        res.status(400);
        throw new Error('Nombre de archivo inválido');
    }

    const uploadsDir = path.join(__dirname, '../uploads');
    const filePath = path.join(uploadsDir, filename);

    try {
        await fs.access(filePath);
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
