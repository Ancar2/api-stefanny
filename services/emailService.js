const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Crear transportador (configurar con tu servicio de email)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
        port: process.env.SMTP_PORT || 2525,
        auth: {
            user: process.env.SMTP_EMAIL || 'user',
            pass: process.env.SMTP_PASSWORD || 'pass',
        },
    });

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html
    };

    const info = await transporter.sendMail(message);

    console.log('Mensaje enviado: %s', info.messageId);
};

module.exports = sendEmail;
