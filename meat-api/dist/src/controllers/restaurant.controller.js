"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurants_model_1 = require("../models/restaurants.model");
const pageSize = 5; // Define a quantidade de documentos retornados pelo mongoose.
class RestaurantsController {
    // Retornas todos os restaurantes.
    static getRestaurants(req, res, next) {
        restaurants_model_1.Restaurants.find({}).then(rest => {
            res.json({
                status: 'success',
                message: rest
            });
            return next();
        })
            .catch(next);
    }
    // Retornas todos os restaurantes.
    static getRestaurantsPagination(req, res, next) {
        // pegando a página.
        let page = parseInt(req.query._page || 1); // Pega o queryParams se não tiver será 1.
        page = page > 0 ? page : 1;
        // calculando a quantidade de páginas.
        restaurants_model_1.Restaurants.count({}).exec().then(count => {
            const qtdPages = Math.ceil(count / pageSize);
            // se a página for maior que a quantidade de páginas disponíveis, então retorna a última.
            page = page > qtdPages ? qtdPages : page;
            // calculando o skip.
            const skip = (page - 1) * pageSize;
            restaurants_model_1.Restaurants.find({})
                .skip(skip)
                .limit(pageSize)
                .then(rest => {
                res.json({
                    status: 'success',
                    message: {
                        page: page,
                        qtdpages: qtdPages,
                        restaurants: rest
                    }
                });
                return next();
            })
                .catch(next);
        })
            .catch(next);
    }
    // Retorna um restaurante pelo id.
    static getRestaurant(req, res, next) {
        restaurants_model_1.Restaurants.findById(req.params.id).then(rest => {
            if (rest) {
                res.json({
                    status: 'success',
                    message: rest
                });
                return next();
            }
            res.status(404);
            res.json({ msg: 'id não encontrado' });
            return next();
        })
            .catch(next);
    }
    // Retorna um restaurante pelo nome.
    static getRestaurantByName(req, res, next) {
        restaurants_model_1.Restaurants.findByName(req.params.name).then(rest => {
            if (rest) {
                res.json({
                    status: 'success',
                    message: rest
                });
                return next();
            }
            res.status(404);
            res.json({ msg: 'id não encontrado' });
            return next();
        })
            .catch(next);
    }
    // Insere um restaurante.
    static postRestaurant(req, res, next) {
        // Cria um novo documento para ser salvo.
        let restaurant = new restaurants_model_1.Restaurants(req.body); // req.body já retorna todos os campos em comum com o documento.
        // restaurant.name = 'Diana';
        // restaurant.email = 'email';
        // Salva o documento.
        restaurant.save().then(rest => {
            // restaurant.password = undefined; Para não retornar o password
            res.json({
                status: 'success',
                message: rest
            });
            return next();
        })
            .catch(next);
    }
    // O PUT é utilizando quando se quer alterar todo o documento.
    static putRestaurant(req, res, next) {
        // Com essa opção, o mongoose fará o update completo, ou seja, o conteùdo do body será o novo documento.
        // Se esquecer do campo password por exemplo, o novo documento no mongo não o terá.
        const ops = { overwrite: true, runValidators: true };
        restaurants_model_1.Restaurants.update({ _id: req.params.id }, req.body, ops).exec().then(result => {
            if (result.n)
                return restaurants_model_1.Restaurants.findById(req.params.id).then(rest => {
                    res.json({
                        status: 'success',
                        message: rest
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
    static patchRestaurant(req, res, next) {
        const ops = { runValidators: true, new: true }; // Indica para o findByIdAndUpdate retorna o novo documento.
        restaurants_model_1.Restaurants.findByIdAndUpdate(req.params.id, req.body, ops).then(rest => {
            if (rest) {
                res.json({
                    status: 'success',
                    message: rest
                });
                return next();
            }
            res.status(404);
            res.json({ 'erro': 'ERROR' });
            return next();
        }).catch(next);
    }
    // Deleta um restaurante.
    static deleteRestaurant(req, res, next) {
        restaurants_model_1.Restaurants.findByIdAndRemove(req.params.id).then(rest => {
            if (rest)
                res.json({
                    status: 'success',
                    message: rest
                });
            else {
                res.status(404);
                res.json({ "msg": false });
            }
            return next();
        })
            .catch(next);
    }
    // Retorna o menu todo restaurante.
    static getMenu(req, res, next) {
        // '+menu' é uma projeção que indica que o campo menu que está marcado como select: false é pra ser retornado.
        // 'name _id' só terona o name o _id.
        restaurants_model_1.Restaurants.findById(req.params.id, '-_id -name +menu').then(rest => {
            if (rest) {
                res.json({
                    status: 'success',
                    message: rest
                });
                return next();
            }
            else {
                res.status(404);
                res.json({
                    status: 'error',
                    message: 'menu não encontrado'
                });
            }
        })
            .catch(next);
    }
    // Insere um array do tipo menu.
    static putReplaceMenu(req, res, next) {
        restaurants_model_1.Restaurants.findById(req.params.id).then(rest => {
            if (rest) {
                rest.menu = req.body; // array de menu.
                rest.save().then(restVal => {
                    res.json({
                        status: 'success',
                        message: restVal
                    });
                    return next();
                })
                    .catch(next);
            }
            else {
                res.status(404);
                res.json({
                    status: 'error',
                    message: 'Não foi possível inserir o menu'
                });
            }
        })
            .catch(next);
    }
}
exports.default = RestaurantsController;
// const restaurantController = new RestaurantsController();
// export default restaurantController; 
