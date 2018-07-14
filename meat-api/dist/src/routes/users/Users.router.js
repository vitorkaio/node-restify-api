"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./../../server/common/Router");
const Users_model_1 = require("./../../models/users/Users.model");
class UsersRouter extends Router_1.Router {
    applyRouters(router) {
        router.get('/users', (req, res, next) => {
            Users_model_1.default.findAll().then(users => {
                res.json(users);
            });
        });
    }
}
const userRouter = new UsersRouter();
exports.default = userRouter;
