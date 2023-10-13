const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo "User"
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // asegura que el email sea único en la base de datos
        match: [ // valida que el email tenga un formato correcto
            /^[\w.-]+@[\w.-]+\.\w+$/,
            'Please enter a valid email'
        ]
    },

    password: {
        type: String,
        required: [true, 'Password is required']
        // Puedes agregar más validaciones dependiendo de tus requerimientos, 
        // como una longitud mínima, caracteres especiales, etc.
    },

    bio: String,

    active: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now // Se establece la fecha actual por defecto
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
