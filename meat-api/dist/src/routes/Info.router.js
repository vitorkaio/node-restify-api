"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./../../server/common/Router");
class InfoRouter extends Router_1.Router {
    applyRouters(router) {
        router.get('/info', (req, res, next) => {
            res.json({
                browser: req.userAgent(),
                method: req.method,
                url: req.href(),
                path: req.path(),
                query: req.query,
            });
            return next();
        });
    }
}
const infoRouter = new InfoRouter();
exports.default = infoRouter;
