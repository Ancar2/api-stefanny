const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const router = require('./routes/routes');
// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Inicializar app
const app = express();

// Configurar Rate Limiter (Limitar peticiones)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10000, // Limite de 100 peticiones por IP por ventana
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo en 15 minutos'
});

// Middleware
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
};
app.use(cors(corsOptions));

app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false })); // Headers de seguridad (CSP disabled for 3D/Scripts)
app.use(limiter); // Rate limiting
app.use(cookieParser()); // Parse cookies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Logging en desarrollo
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rutas
app.use('/api', router)



// Verificación de estado (Health Check)
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'API funcionando', timestamp: new Date() });
});

// Manejo de Errores
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${PORT}`);
});
