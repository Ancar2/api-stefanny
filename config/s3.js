const { S3Client } = require('@aws-sdk/client-s3');

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_S3_BUCKET;

if (!region) {
    console.warn('AWS_REGION no está definido');
}

if (!bucket) {
    console.warn('AWS_S3_BUCKET no está definido');
}

const s3Client = new S3Client({
    region,
    credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
        : undefined
});

module.exports = {
    s3Client,
    bucket,
    region
};
