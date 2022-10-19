//* Middleware for protect routes
//Todo => 1) token exist?
//Todo => 2) Token belongs to one user
//Todo => 3) Modify req && add req.user with token informartion

//? Strategies => Types of methods for auth diferents platforms [Facebook, google, JWT, Github]

//* Import dependencies
const JWTStrategy = require('passport-jwt').Strategy; //todo => Strategies for diferents authentications
const ExtractJwt = require('passport-jwt').ExtractJwt; //todo => Extract headers from req.body
const { jwtSecret } = require('../config');
const { getUserById } = require('../users/users.controllers');

//* Export anonymous function
module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
  };

  passport.use(
    new JWTStrategy(opts, async (decoded, done) => {
      // done(error, decoded);

      try {
        const response = await getUserById(decoded.id)
        if (!response) {
          return done(null, false);
        };
        console.log('decoded JWT', decoded);
        return done(null, decoded);
      } catch (error) {
        return done(error, false);
      }

    })
  );
};
