import * as restify from 'restify';
import { Router } from './../../server/common/Router';

class InfoRouter extends Router {
  public applyRouters(router: restify.Server) {
    router.get('/info', (req, res, next) => {
      res.json({
        browser: req.userAgent(), // mostra qual browser fez a requisição
        method: req.method, // retorna qual metódo http foi disparado
        url: req.href(), // url disparada
        path: req.path(), // path da rota
        query: req.query, // lista os parâmentros query da rota
      });
      return next();
    });
  }
}

const infoRouter = new InfoRouter();
export default infoRouter;