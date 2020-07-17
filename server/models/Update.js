const { Schema, Types, model } = require("mongoose");

const Update = new Schema({
    date: { type: String, default: Date.now },
    action: { type: String },
    giraffe: { type: String },
    status: { type: String, default: 'Выполнено' },
    aviary: { type: Types.ObjectId, ref: 'Aviary' }
});

module.exports = model('Update', Update);