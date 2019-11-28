const jwt = require('jsonwebtoken')
const secretKey = 'CHtLJ,8f252rm[j';
const tokenExpirationSeconds= 11 * 60;

function generateToken(_userData) {
  const tokenData = { _id: _userData._id, username: _userData.username, role: _userData.role}
  let expiration = Math.floor(new Date().getTime() / 1000) + tokenExpirationSeconds;
  let token = jwt.sign(tokenData, secretKey, { expiresIn: expiration });
  return token;
}

function validateAuthorization(_headers) {
  let payload = getPayload(_headers);
  const expiration = (payload.exp - payload.iat) * 1000;
  const isExpired = expiration < new Date().getTime();
  console.log("[JWT EXPIRING]", {
    expiration: new Date(expiration),
    requestTime: new Date()
  });
  if (isExpired) throw new Error("EXPIRED");
  return;
}

const isAdministrator = (_headers)=>{
  return getPayload(_headers).role === 'admin';
}

const isSameClient = (_headers, _clientId)=>{
  let clientId = getPayload(_headers)
  return clientId._id === _clientId;
}

const getPayload = (_headers)=>{
  const token = (_headers && _headers.authorization) ? _headers.authorization.replace('Bearer ', '') : null
  if(!token) throw new Error('NO_TOKEN_PROVIDED')
  console.log((`[context header authorizaton] - ${token}`));
  try {
    return jwt.verify(token, secretKey);
  } catch {
    throw new Error("INVALID_TOKEN");
  }
}

export {generateToken, validateAuthorization, isAdministrator, isSameClient, getPayload}