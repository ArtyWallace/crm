const { Schema, model } = require("mongoose");

const aviarySchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = model('Aviary', aviarySchema);