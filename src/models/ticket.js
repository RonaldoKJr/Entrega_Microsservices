'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: Number,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Ticket', schema)
