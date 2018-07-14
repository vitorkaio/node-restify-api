"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("./../errors/validators");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3 // Tamanho mínimo da string
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        select: false,
        required: true // é obrigatório o campo ao inserir ou atualizar
    },
    gender: {
        type: String,
        required: false,
        enum: ['homem', 'mulher']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.default,
            message: '{PATH}: invalid CPF ({VALUE})'
        }
    }
});
// middlware pra criptografar a senha antes de salva no banco de dados.
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password'))
        next();
    else {
        // criptografa o password.
        bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
            next();
        })
            .catch(next);
    }
});
// middlware pra criptografar a senha antes de atualizar no banco de dados.
userSchema.pre('findOneAndUpdate', function (next) {
    if (!this.getUpdate().password)
        next();
    else {
        // criptografa o password.
        bcrypt.hash(this.getUpdate().password, 10).then(hash => {
            this.getUpdate().password = hash;
            next();
        })
            .catch(next);
    }
});
// middlware pra criptografar a senha antes de atualizar no banco de dados.
userSchema.pre('update', function (next) {
    if (!this.getUpdate().password)
        next();
    else {
        // criptografa o password.
        bcrypt.hash(this.getUpdate().password, 10).then(hash => {
            this.getUpdate().password = hash;
            next();
        })
            .catch(next);
    }
});
// <User> generics
exports.Users = mongoose.model('User', userSchema);
