// models/Vocab.js
const mongoose = require("mongoose");

const vocabSchema = new mongoose.Schema({
    meaning: {type: String, required: true},
    hiragana: {type: String, required: true},
    level: {type: Number, required: true},
    num_shown: {type: Number, required: true},
    num_correct: {type: Number, required: true}
});
module.exports = vocabSchema;