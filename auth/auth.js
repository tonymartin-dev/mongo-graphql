const jwt = require('jsonwebtoken')
const secretKey = 'CHtLJ,8f252rm[j';
const tokenExpirationSeconds= 180;

function generateToken(_data) {
  let expiration = Math.floor(new Date().getTime() / 1000) + tokenExpirationSeconds;
  let token = jwt.sign(_data, secretKey, { expiresIn: expiration });
  return token;
}

function isTokenValid(_headers) {
  const token = (_headers && _headers.authorization) ? _headers.authorization.replace('Bearer ', '') : null
  console.log((`[context header authorizaton] - ${token}`));
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch {
    throw new Error("INVALID_TOKEN");
  }
  const expiration = (payload.exp - payload.iat) * 1000;
  const isExpired = expiration < new Date().getTime();
  console.log("[JWT EXPIRING]", {
    expiration: new Date(expiration),
    requestTime: new Date()
  });
  if (isExpired) throw new Error("EXPIRED");
  return;
}

export {generateToken, isTokenValid}