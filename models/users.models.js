const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const usersCollection = 'users';

const usersSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
    password: {
        type: String
    },
    rol: {
        type: String,
        default: 'user'
    },
});

const usersModel = mongoose.model(usersCollection, usersSchema);

module.exports = usersModel;