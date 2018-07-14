"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./../../server/common/Router");
const reviews_controller_1 = require("../controllers/reviews.controller");
// import { ModelRouter } from './../routes/model.router';
class ReviewsRouter extends Router_1.Router {
    applyRouters(router) {
        router.get('/reviews', reviews_controller_1.default.getReviews);
        // ReviewsController.printTime é um midd que é chamado antes de getReview
        router.get('/reviews/:id', [reviews_controller_1.default.printTime, reviews_controller_1.default.getReview]);
        router.post('/reviews', reviews_controller_1.default.postReview);
        router.put('/reviews/:id', reviews_controller_1.default.putReview);
        router.patch('/reviews/:id', reviews_controller_1.default.patchReview);
        router.del('/reviews/:id', reviews_controller_1.default.deleteReview);
    }
}
const reviewsRouter = new ReviewsRouter();
exports.default = reviewsRouter;
