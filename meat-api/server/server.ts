import * as restify from 'restify';
import * as mongoose from 'mongoose'; 

import env from './common/env';
import { Router } from './common/Router';
import handlerError from './../src/errors/error.handler';

export class Server {

  public application: restify.Server;

  // Inicializa o banco de dados, mongodb - mongoose.
  public initializeDB(): Promise<any> {
    (<any>mongoose).Promise = global.Promise; // Ativando promises no mongoose
    return mongoose.connect(env.db.url);
  }

  // Configuração do servidor.
  public initRoutes(routers: Router[]): Promise<any> {
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
        for(const router of routers) {
          router.applyRouters(this.application);
        }

        this.application.listen(env.server.port, () => {
          resolve(this.application);
        });

        // Trata os erros
        this.application.on('restifyError', handlerError)
        
      } catch (error) {
        reject(error);
      }

    });
  }// initRoutes

  // Inicializa o servidor.
  public bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initializeDB().then(() => 
      this.initRoutes(routers).then(() => this)
    );
  }

  // Terminar a execução do servidor.
  public shutdown() {
    return mongoose.disconnect().then(() => this.application.close());
  }

}// Fim da classe