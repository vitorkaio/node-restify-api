import * as restify from 'restify';

const handlerError = (req: restify.Request, res:restify.Response, err, done) => {
  // console.log(err);

  err.toJSON = () => {
    return {
      status: 'error',
      error: err.message,
    }
  }

  switch (err.name) {
    case 'MongoError':
      if(err.code === 11000) {
        err.statusCode = 400;
      }
      
    break;

    case 'CastError':
      err.statusCode = 404;
      // err.message = 'Cast error';
    break;

    case 'ValidationError':
      err.statusCode = 400;
      const messages: any[] = [];
      for(let name in err.errors)
        messages.push({erro: err.errors[name].message});
      
      err.toJSON = () => ({
        status: 'error',
        message: messages
      });
    break;
  
  }

  done();
}

export default handlerError;