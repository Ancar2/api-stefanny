/**
 * Estandarizar respuestas de la API
 * @param {Object} res - Objeto respuesta de Express
 * @param {number} statusCode - Código de estado HTTP
 * @param {any} data - Datos para enviar
 * @param {string} message - Mensaje opcional
 */
const sendResponse = (res, statusCode, data, message = null) => {
    const response = {
        success: true,
        data,
    };

    if (message) {
        response.message = message;
    }

    res.status(statusCode).json(response);
};

module.exports = sendResponse;
