"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
;
;
// Schema que será utilizado dentro de outro Schema.
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: []
    }
});
// Adiciona um método static de pesquisa personalizado ao moongose.
restaurantSchema.statics.findByName = function (name) {
    return this.findOne({ name }); // {name: name}
};
exports.Restaurants = mongoose.model('Restaurant', restaurantSchema);
