const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [ 
            /^[\w.-]+@[\w.-]+\.\w+$/,
            'Please enter a valid email'
        ]
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    
    },

    bio: String,

    active: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now 
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
