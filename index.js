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

// Confiar en el proxy (Cloudfont/Netlify) para headers como X-Forwarded-For
app.set('trust proxy', 1);

// Configurar Rate Limiter (Limitar peticiones)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10000, // Limite de 10000 peticiones
    message: 'Demasiadas peticiones desde esta IP'
});

// Middleware
const corsOptions = {
    origin: function (origin, callback) {
        // En lugar de una lista blanca estricta, permitimos que el servidor 
        // responda a cualquier origen enviando el header de vuelta.
        // Esto soluciona problemas donde el proxy (Cloudfront) altera los headers.
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'X-CSRF-Token'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false
}));
app.use(limiter); // Rate limiting
app.use(cookieParser()); // Parse cookies
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
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
