const asyncHandler = require('express-async-handler');
const { ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client, bucket, region } = require('../config/s3');

const PREFIX = 'steffany-portfolio/';

const getPublicS3Url = (key) => {
    if (!bucket || !region) return null;
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

const inferResourceType = (key = '') => {
    const lower = key.toLowerCase();
    if (/\.(mp4|mov|avi|webm|mkv|m4v)$/i.test(lower)) return 'video';
    if (/\.(jpg|jpeg|png|gif|webp|svg|bmp|avif)$/i.test(lower)) return 'image';
    return 'raw';
};

// @desc    Obtener lista de archivos de S3
// @route   GET /api/admin/media
// @access  Privado/Admin
const getMediaLibrary = asyncHandler(async (req, res) => {
    const { max_results = 50, next_cursor } = req.query;

    if (!bucket || !region) {
        res.status(500);
        throw new Error('Configuración de S3 incompleta en variables de entorno');
    }

    const result = await s3Client.send(new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: PREFIX,
        MaxKeys: parseInt(max_results, 10) || 50,
        ContinuationToken: next_cursor || undefined
    }));

    const resources = (result.Contents || []).map((item) => ({
        public_id: item.Key,
        url: getPublicS3Url(item.Key),
        secure_url: getPublicS3Url(item.Key),
        bytes: item.Size,
        created_at: item.LastModified,
        resource_type: inferResourceType(item.Key),
        type: 'upload',
        source: 's3'
    }));

    res.json({
        resources,
        next_cursor: result.IsTruncated ? result.NextContinuationToken : null,
        total_count: resources.length
    });
});

// @desc    Eliminar archivo de S3
// @route   DELETE /api/admin/media
// @access  Privado/Admin
const deleteMedia = asyncHandler(async (req, res) => {
    const key = req.query.publicId || req.query.key;

    if (!key) {
        res.status(400);
        throw new Error('Key/Public ID es requerido');
    }

    if (!bucket) {
        res.status(500);
        throw new Error('Configuración de S3 incompleta en variables de entorno');
    }

    await s3Client.send(new DeleteObjectCommand({
        Bucket: bucket,
        Key: key
    }));

    res.json({ message: 'Archivo eliminado correctamente' });
});

module.exports = {
    getMediaLibrary,
    deleteMedia
};
