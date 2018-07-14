"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./../../server/common/Router");
const users_controller_1 = require("../controllers/users.controller");
class UsersRouter extends Router_1.Router {
    applyRouters(router) {
        router.get('/users', users_controller_1.default.getUsers);
        router.get('/users/:id', users_controller_1.default.getUser);
        router.post('/users', users_controller_1.default.postUser);
        router.put('/users/:id', users_controller_1.default.putUser);
        router.patch('/users/:id', users_controller_1.default.patchUser);
        router.del('/users/:id', users_controller_1.default.deleteUser);
    }
}
const userRouter = new UsersRouter();
exports.default = userRouter;
