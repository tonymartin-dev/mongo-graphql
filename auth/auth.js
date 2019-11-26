const jwt = require('jsonwebtoken')
const secretKey = 'huhu';
const tokenExpirationSeconds= 180;

function generateToken(_data) {
  let expiration =
    Math.floor(new Date().getTime() / 1000) + tokenExpirationSeconds;
  let token = jwt.sign(_data, secretKey, { expiresIn: expiration });
  return token;
}

function isTokenValid(_token) {
  let payload;
  try {
    payload = jwt.verify(_token, secretKey);
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