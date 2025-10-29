import dotenv from "dotenv"
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js"

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
  },
  
   async (accessToken, refreshToken, profile, done) => {   

    try {
        console.log("Login with google");
        
        const email = profile.emails[0].value;
        const name = profile.displayName;

        if (!email) {
          return done(new Error("Email not found in Google profile"), null);
        }

        let user = await User.findOne({email})

        if(!user){
          user = await User.create({
            name,
            email,
            googleId: profile.id 
          });
        }
        
        const token = user.createJWT();

        
        done(null, {user, token});
    } catch (error) {
        console.log(error, "ERROR");        
        done(error, null)
    }

  }
));