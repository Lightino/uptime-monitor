import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: process.env.JWKSURI
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

export default function authMiddleware(options = { credentialsRequired: true }) {
  return (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    if (token) {
      jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
          next(new Error('Invalid Token ' + err.message));
        } else {
          req.user = decoded;
          next();
        }
      });
    } else if (!options.credentialsRequired) {
      next();
    } else {
      next(new Error('No authentication token provided'));
    }
  };
}
