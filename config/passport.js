const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

/*
  👉 ONLY THESE EMAILS WILL BE ADMIN
  Change these to your real admin emails
*/
const ADMIN_EMAILS = [
  "admin@gmail.com",
  "admin@smartpg.com"
];

passport.use(
  new GoogleStrategy(
    {
      clientID: "1017890527175-943pg2db8egph6cc3um0s660of28sr8c.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // ✅ ROLE DECISION HAPPENS HERE
        const role = ADMIN_EMAILS.includes(email)
          ? "admin"
          : "student";

        let user = await User.findOne({ email });

        if (!user) {
          // CREATE NEW USER
          user = await User.create({
            name: profile.displayName,
            email,
            role,
          });
        } else {
          // UPDATE ROLE IF CHANGED
          user.role = role;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
