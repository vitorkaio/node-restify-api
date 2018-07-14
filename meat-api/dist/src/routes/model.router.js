"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./../../server/common/Router");
// Classe abstrata para generalizar os models.
class ModelRouter extends Router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.findAll = (req, res, next) => {
            this.model.find({}).then(values => {
                res.json(values);
                return next();
            })
                .catch(next);
        };
    }
}
exports.ModelRouter = ModelRouter;
