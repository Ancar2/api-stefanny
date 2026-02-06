const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;



// # -- - Configuración del Servidor-- -
// # Puerto donde correrá el servidor Express
// PORT = 5001



// # -- - Configuración de Base de Datos-- -
// # Cadena de conexión para MongoDB(Local o Atlas)
// MONGO_URI = mongodb://localhost:27017/mean_base_db




// # -- - Seguridad-- -
// # Clave secreta para firmar y verificar tokens JWT(¡Mantenla privada!)
// JWT_SECRET = supersecretkey_changeme
// # Tiempo de expiración del token(ej: 30d, 24h, 60m)
// TOKEN_EXPIRE = 30d
// # Entorno: 'development'(muestra logs / errores detallados) o 'production'
// NODE_ENV = development




// # -- - Servicio de Email(SMTP)-- -
// # Host del proveedor de email(ej: smtp.gmail.com, smtp.office365.com, smtp.mailtrap.io)
// SMTP_HOST = smtp.gmail.com
// # Puerto para SMTP(2525, 587 El más común y seguro(TLS), 465. Conexión segura SSL) Es el puerto de conexión al servidor SMTP.
//     SMTP_PORT = 2525
// # Usuario SMTP(generalmente el correo electrónico)
// SMTP_EMAIL = correo
// # Contraseña SMTP(o App Password)
// SMTP_PASSWORD = contrasena
// # Dirección 'From' por defecto al enviar correos
// FROM_EMAIL = contacto@dominio.com
// # Nombre 'From' por defecto al enviar correos
// FROM_NAME = nombre
