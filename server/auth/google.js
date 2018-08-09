const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models');
module.exports = router;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.');
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  };

  const strategy = new GoogleStrategy(
    googleConfig,
    (token, refreshToken, profile, done) => {
      // console.log('profile', profile)
      const googleId = profile.id;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const email = profile.emails[0].value;

      User.findOrCreate({
        where: { googleId },
        defaults: { firstName, lastName, email }
      })
        .then(([user]) => done(null, user))
        .catch(done);
    }
  );

  passport.use(strategy);

  router.get('/', passport.authenticate('google', { scope: 'email' }));

  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );
}
