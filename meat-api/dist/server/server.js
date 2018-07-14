"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const env_1 = require("./common/env");
const error_handler_1 = require("./../src/errors/error.handler");
class Server {
    // Inicializa o banco de dados, mongodb - mongoose.
    initializeDB() {
        mongoose.Promise = global.Promise; // Ativando promises no mongoose
        return mongoose.connect(env_1.default.db.url);
    }
    // Configuração do servidor.
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'api-meat',
                    version: '1.0.0'
                });
                // Plugin para fazer o parse dos params query e preencher o obj req.query.
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                // routes
                for (const router of routers) {
                    router.applyRouters(this.application);
                }
                this.application.listen(env_1.default.server.port, () => {
                    resolve(this.application);
                });
                // Trata os erros
                this.application.on('restifyError', error_handler_1.default);
            }
            catch (error) {
                reject(error);
            }
        });
    } // initRoutes
    // Inicializa o servidor.
    bootstrap(routers = []) {
        return this.initializeDB().then(() => this.initRoutes(routers).then(() => this));
    }
    // Terminar a execução do servidor.
    shutdown() {
        return mongoose.disconnect().then(() => this.application.close());
    }
} // Fim da classe
exports.Server = Server;
