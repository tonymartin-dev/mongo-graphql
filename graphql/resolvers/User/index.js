// The User schema.
import User from "../../../models/User";
const bcrypt = require('bcrypt')
import {generateToken, validateAuthorization} from '../../../auth/auth'

/**
 * QUERIES
 */

const login = (root, {username, password})=>{
  return new Promise((resolve, reject) => {
    User.findOne({username}).exec((findError, userData) => {
      
      if(findError || !userData) return reject(new Error('INCORRECT_LOGIN'));
      
      const isLogged = bcrypt.compareSync(password, userData.password);
      if(!isLogged) return reject(new Error('INCORRECT_LOGIN'));
      
      userData.token = generateToken(userData);
      console.log('[TOKEN GENERATED]: ', {token: userData.token});

      resolve(userData);
      
    });
  });
}

const userByID = (root, args, context)=>{
  return new Promise((resolve, reject) => {
    validateAuthorization(context.headers);
    User.findById(args._id).exec((queryErr, res) => {
      queryErr ? reject(queryErr) : resolve(res);
    });
  });
}

const user = (root, args, context)=>{
  return new Promise((resolve, reject) => {
    User.findOne(args).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

const users = (root, args, context)=>{
  return new Promise((resolve, reject) => {
    User.find({})
      .populate()
      .exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
  });
}

/**
 * MUTATIONS
 */

const addUser = (root, { _id, username, email, password, role }, context)=>{
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(password, salt, function(err, hash){
        const newUser = new User({ _id, username, password: hash, email, role });
        console.log('[NEW USER]: ', newUser)
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    });
  });
};

const editUser = (root, { _id, id, name, email }, context)=>{
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_id, { $set: { id, name, email } }).exec(
      (err, res) => {
        err ? reject(err) : resolve(res);
      }
    );
  });
};

const deleteUser = (root, args, context)=>{
  return new Promise((resolve, reject) => {
    User.findOneAndRemove(args).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export default {
  Query: {
    login,
    userByID,
    user,
    users
  },
  Mutation: {
    addUser,
    editUser,
    deleteUser
  }
};