const mongoose = require('mongoose');

const policySchema = mongoose.Schema(
    {
        privacyPolicy: {
            type: String,
            default: 'Política de Privacidad pendiente de redacción.'
        },
        termsAndConditions: {
            type: String,
            default: 'Términos y Condiciones pendientes de redacción.'
        },
        cancellationPolicy: {
            type: String, // Para reservas
            default: 'Política de Cancelación pendiente.'
        }
    },
    {
        timestamps: true
    }
);

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
