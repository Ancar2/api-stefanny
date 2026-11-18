# API Portafolio Administrable

Backend REST en Node.js + Express + MongoDB para un sitio de portafolio con contenido administrable: el administrador gestiona el contenido del sitio y los visitantes consultan servicios, productos, galería y testimonios, o envían mensajes de contacto.

## Funcionalidades

Todas las rutas cuelgan de `/api` (hay un `GET /api/health`). Las rutas `/admin/*` requieren autenticación y rol de administrador.

| Módulo | Qué ofrece |
|---|---|
| Autenticación | Registro, login, logout, recuperación y restablecimiento de contraseña, `GET /auth/me` |
| Usuarios | Perfil y contraseña propios; CRUD de usuarios para administradores |
| Contenido del sitio | Hero, acerca de, secciones uno y dos, políticas y contenido por clave |
| Servicios y productos | Listado y detalle públicos; CRUD administrativo |
| Galería | Listado y detalle públicos; CRUD administrativo |
| Testimonios | Envío público, aprobación y eliminación por el administrador |
| Contacto | Envío de mensajes; bandeja de mensajes para administradores |
| Subida de archivos | Subida de imágenes a AWS S3 y subida local |
| Estadísticas | Registro de visitas y estadísticas del dashboard |

## Tecnologías

Node.js · Express 4 · MongoDB (Mongoose) · JWT · bcryptjs · express-validator · helmet · express-rate-limit · Multer · Nodemailer · AWS S3

## Requisitos

- Node.js (versión LTS reciente)
- Una instancia de MongoDB accesible
- Credenciales de SMTP y de un bucket de AWS S3 si usas correo y subida de imágenes

## Instalación

```bash
git clone https://github.com/Ancar2/api-stefanny.git
cd api-stefanny
npm install
```

## Configuración

Crea un archivo `.env` en la raíz con estas variables:

| Variable | Descripción |
|---|---|
| `NODE_ENV` | Modo de ejecución (`development` o `production`) |
| `PORT` | Puerto del servidor (5001 por defecto) |
| `MONGO_URI` | Cadena de conexión a MongoDB |
| `JWT_SECRET` | Clave para firmar los tokens |
| `TOKEN_EXPIRE` | Tiempo de expiración del token |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_EMAIL`, `SMTP_PASSWORD` | Servidor de correo |
| `FROM_EMAIL`, `FROM_NAME` | Remitente de los correos |
| `AWS_REGION`, `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | Almacenamiento de imágenes en S3 |

## Ejecución

```bash
npm run dev   # nodemon
```

## Estructura del proyecto

```text
config/        Conexión a la base de datos y configuración de S3
controllers/   Lógica de cada endpoint
middleware/    Autenticación, roles y validación
models/        Esquemas de Mongoose
routes/        Definición de rutas
services/      Correo y subida de archivos
utils/         Utilidades compartidas
```

## Autor

Andrés Cárdenas ([Ancar](https://github.com/Ancar2)) · [cardenaslabs.com](https://cardenaslabs.com/)
