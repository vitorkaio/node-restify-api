"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reviews_model_1 = require("../models/reviews.model");
class ReviewsController {
    // Retornas todos os reviews.
    static getReviews(req, res, next) {
        reviews_model_1.Reviews.find({}).then(rev => {
            res.json({
                status: 'success',
                message: rev
            });
            return next();
        })
            .catch(next);
    }
    // middlerware de teste para a rota reviews/:id
    static printTime(req, res, next) {
        console.log(new Date().toISOString());
        return next();
    }
    // Retorna um review.
    static getReview(req, res, next) {
        reviews_model_1.Reviews.findById(req.params.id)
            .populate('user', 'name') // popula a ref user com a coleção User, add apenas o campo name.
            .populate('restaurant', 'name') // popula a ref com a coleção restaurant e add todos os campos.
            .then(rev => {
            if (rev) {
                res.json({
                    status: 'success',
                    message: rev
                });
                return next();
            }
            res.status(404);
            res.json({
                status: 'error',
                message: 'id não encontrado'
            });
            return next();
        })
            .catch(next);
    }
    // Insere um review.
    static postReview(req, res, next) {
        // Cria um novo documento para ser salvo.
        let restaurant = new reviews_model_1.Reviews(req.body); // req.body já retorna todos os campos em comum com o documento.
        // restaurant.name = 'Diana';
        // restaurant.email = 'email';
        // Salva o documento.
        restaurant.save().then(rev => {
            // restaurant.password = undefined; Para não retornar o password
            res.json({
                status: 'success',
                message: rev
            });
            return next();
        })
            .catch(next);
    }
    // O PUT é utilizando quando se quer alterar todo o documento.
    static putReview(req, res, next) {
        // Com essa opção, o mongoose fará o update completo, ou seja, o conteùdo do body será o novo documento.
        // Se esquecer do campo password por exemplo, o novo documento no mongo não o terá.
        const ops = { overwrite: true, runValidators: true };
        reviews_model_1.Reviews.update({ _id: req.params.id }, req.body, ops).exec().then(result => {
            if (result.n)
                return reviews_model_1.Reviews.findById(req.params.id).then(rev => {
                    res.json({
                        status: 'success',
                        message: rev
                    });
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
    static patchReview(req, res, next) {
        const ops = { runValidators: true, new: true }; // Indica para o findByIdAndUpdate retorna o novo documento.
        reviews_model_1.Reviews.findByIdAndUpdate(req.params.id, req.body, ops).then(rev => {
            if (rev) {
                res.json({
                    status: 'success',
                    message: rev
                });
                return next();
            }
            res.status(404);
            res.json({ 'erro': 'ERROR' });
            return next();
        }).catch(next);
    }
    // Deleta um review.
    static deleteReview(req, res, next) {
        reviews_model_1.Reviews.findByIdAndRemove(req.params.id).then(rev => {
            if (rev)
                res.json({
                    status: 'success',
                    message: rev
                });
            else {
                res.status(404);
                res.json({ "msg": false });
            }
            return next();
        })
            .catch(next);
    }
}
exports.default = ReviewsController;
