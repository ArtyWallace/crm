const { Schema, Types, model } = require("mongoose");

const giraffeSchema = new Schema({
    name: { type: String, default: 'Имя' },
    gender: { type: String, default: '-' },
    weight: { type: String, default: '-' },
    height: { type: String, default: '-' },
    color: { type: String, default: '' },
    diet: { type: String, default: '' },
    nature: { type: String, default: '' },
    aviary: { type: Types.ObjectId, ref: 'Aviary' }
});

module.exports = model('Giraffe', giraffeSchema);