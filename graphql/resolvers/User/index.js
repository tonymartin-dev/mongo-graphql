// The User schema.
import User from "../../../models/User";
const bcrypt = require('bcrypt')
//import {generateToken, validateAuthorization, isAdministrator, isSameClient, getPayload} from '../../../auth/auth'
import * as auth from '../../../auth/auth'

/**
 * QUERIES
 */

const login = (root, {username, password})=>{
  return new Promise((resolve, reject) => {
    User.findOne({username}).exec((findError, userData) => {
      
      if(findError || !userData) return reject(new Error('INCORRECT_LOGIN'));
      
      const isLogged = bcrypt.compareSync(password, userData.password);
      if(!isLogged) return reject(new Error('INCORRECT_LOGIN'));
      
      userData.token = auth.generateToken(userData);
      console.log('[TOKEN GENERATED]: ', {token: userData.token});

      resolve(userData);
      
    });
  });
}

const refreshToken =  (root, args, context)=>{
  return new Promise((resolve, reject) => {
    auth.validateAuthorization(context.headers);
    const payload = auth.getPayload(context.headers);
    const token = auth.generateToken(payload);
    resolve(token)
  })
}

const userByID = (root, args, context)=>{
  return new Promise((resolve, reject) => {
    auth.validateAuthorization(context.headers);
    User.findById(args._id).exec((queryErr, res) => {
      queryErr ? reject(queryErr) : resolve(res);
    });
  });
}

const user = (root, args, context)=>{
  return new Promise((resolve, reject) => {
    auth.validateAuthorization(context.headers);
    User.findOne(args).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

const users = (root, args, context)=>{
  return new Promise((resolve, reject) => {
    auth.validateAuthorization(context.headers);
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

const addUser = (root, { username, email, password }, context)=>{
  return new Promise(async(resolve, reject) => {
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const newUser = new User({ username, password: hash, email, role: 'user' });
    console.log('[NEW USER]: ', newUser)
    newUser.save((err, res) => {
      console.log('[NEW USER CREATED]: ', res)
      err ? reject(err) : resolve(res);
    });
  });
};

const editUser = (root, { _id, username, email, role, password }, context)=>{
  return new Promise((resolve, reject) => {
    //Check Auth
    auth.validateAuthorization(context.headers);
    const isAdmin = auth.isAdministrator(context.headers);
    const sameClient = auth.isSameClient(context.headers, _id);
    if(!isAdmin && !sameClient) 
      return reject(new Error('NOT_ALLOWED'));
    
    const updateClient = (_hash)=>{
      const saveClient = isAdmin ? 
        //Select allowed fields depending on user role
        { username, email, role, password: _hash } :
        { username, email, password: _hash };
      //Query
      User.findByIdAndUpdate(_id, { $set: saveClient }).exec(
        (err, res) => {
          res.role = !isAdmin && role ? 'NOT_ALLOWED' : res.role;
          res.password = password ? 'SUCCESSFULLY_CHANGED' : 'NOT_CHANGED';
          err ? reject(err) : resolve(res);
        }
      );
    }

    if(password){
      bcrypt.genSalt(10).then(salt=>{
        bcrypt.hash(password, salt).then(hash=>{
          updateClient(hash);
        })
      })
    }else{
      updateClient();
    }
    
  });
};

const deleteUser = (root, args, context)=>{
  auth.validateAuthorization(context.headers);
  const isAdmin = auth.isAdministrator(context.headers);
  const sameClient = auth.isSameClient(context.headers, _id);
  if(!isAdmin && !sameClient) 
    return reject(new Error('NOT_ALLOWED'));
  return new Promise((resolve, reject) => {
    User.findOneAndRemove(args).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export default {
  Query: {
    login,
    refreshToken,
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