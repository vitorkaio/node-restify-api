import * as mongoose from 'mongoose';
import validaCPF from './../errors/validators';
import * as bcrypt from 'bcryptjs';

export interface User extends mongoose.Document {
  name: string,
  email: string
  password: string,
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 80, // Tamanho máximo da string
    minlength: 3 // Tamanho mínimo da string
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    select: false, // omite esse campo na query
    required: true // é obrigatório o campo ao inserir ou atualizar
  },
  gender: {
    type: String,
    required: false,
    enum: ['homem', 'mulher']
  },
  cpf: {
    type: String,
    required: false,
    validate: { // Validador personalizado.
      validator: validaCPF,
      message: '{PATH}: invalid CPF ({VALUE})'
    }
  }
});

// middlware pra criptografar a senha antes de salva no banco de dados.
userSchema.pre('save', function(next){
  const user: any = this;
  if(!user.isModified('password'))
    next();
  else {
    // criptografa o password.
    bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash;
      next();
    })
    .catch(next);
  }
  
});

// middlware pra criptografar a senha antes de atualizar no banco de dados.
userSchema.pre('findOneAndUpdate', function(next){
  if(!this.getUpdate().password)
    next();
  else {
    // criptografa o password.
    bcrypt.hash(this.getUpdate().password, 10).then(hash => {
      this.getUpdate().password = hash;
      next();
    })
    .catch(next);
  }
});

  // middlware pra criptografar a senha antes de atualizar no banco de dados.
userSchema.pre('update', function(next){
  if(!this.getUpdate().password)
    next();
  else {
    // criptografa o password.
    bcrypt.hash(this.getUpdate().password, 10).then(hash => {
      this.getUpdate().password = hash;
      next();
    })
    .catch(next);
  }
  
});

// <User> generics
export const Users = mongoose.model<User>('User', userSchema);