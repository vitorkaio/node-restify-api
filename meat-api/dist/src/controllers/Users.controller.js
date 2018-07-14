"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("../models/users.model");
class UsersController {
    static getUsers(req, res, next) {
        users_model_1.Users.find({}).then(users => {
            res.json({
                status: 'success',
                message: users
            });
            return next();
        })
            .catch(next);
    }
    static getUser(req, res, next) {
        users_model_1.Users.findById(req.params.id).then(user => {
            if (user) {
                res.json(user);
                return next();
            }
            res.status(404);
            res.json({ msg: 'id não encontrado' });
            return next();
        })
            .catch(next);
    }
    static postUser(req, res, next) {
        // Cria um novo documento para ser salvo.
        let user = new users_model_1.Users(req.body); // req.body já retorna todos os campos em comum com o documento.
        // user.name = 'Diana';
        // user.email = 'email';
        // Salva o documento.
        user.save().then(user => {
            user.password = undefined; //Para não retornar o password
            res.json(user);
            return next();
        })
            .catch(next);
    }
    // O PUT é utilizando quando se quer alterar todo o documento.
    static putUser(req, res, next) {
        // Com essa opção, o mongoose fará o update completo, ou seja, o conteùdo do body será o novo documento.
        // Se esquecer do campo password por exemplo, o novo documento no mongo não o terá.
        const ops = { overwrite: true, runValidators: true };
        users_model_1.Users.update({ _id: req.params.id }, req.body, ops).exec().then(result => {
            if (result.n)
                return users_model_1.Users.findById(req.params.id).then(user => {
                    res.json(user);
                    return next();
                }).catch(erro => {
                    res.status(404);
                    res.json({ 'erro': erro });
                });
            else {
                res.status(404);
                res.json({ 'erro': 'ERROR' });
                return next();
            }
        })
            .catch(next);
    }
    // O PATCH altera apenas partes do documento. Se a propriedade não existir: adicione. Se ela existir: altere. 
    // Pra remover a propriedade: set null.
    static patchUser(req, res, next) {
        const ops = { runValidators: true, new: true }; // Indica para o findByIdAndUpdate retorna o novo documento.
        users_model_1.Users.findByIdAndUpdate(req.params.id, req.body, ops).then(user => {
            if (user) {
                res.json(user);
                return next();
            }
            res.status(404);
            res.json({ 'erro': 'ERROR' });
            return next();
        }).catch(next);
    }
    static deleteUser(req, res, next) {
        users_model_1.Users.findByIdAndRemove(req.params.id).then(user => {
            if (user)
                res.json(user);
            else {
                res.status(404);
                res.json({ "msg": false });
            }
            return next();
        })
            .catch(next);
    }
}
exports.default = UsersController;
