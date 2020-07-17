const { Schema, Types, model } = require("mongoose");

const imageSchema = new Schema({
    fileName: { type: String },
    filePath: { type: String },
    giraffe: { type: Types.ObjectId, ref: 'Giraffe' }
});

module.exports = model('Image', imageSchema);