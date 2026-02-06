const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    ip: {
        type: String,
        required: false
    },
    userAgent: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Visit', visitSchema);
