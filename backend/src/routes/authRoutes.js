import express from "express"
import passport from "passport";

import { login, register } from "../controller/authController.js";

const router = express.Router();

router.post('/register', register)
router.post('/login', login)

router.get("/google", 
  
  passport.authenticate('google', { scope: [
        'openid', 'email', 'profile']
  })

)


router.get("/google/callback", 

    passport.authenticate('google', {session: false, faliureRedirect: '/login'}),

    function(req, res){
        const { token } = req.user;
        res.redirect(`http://localhost:5173/auth-redirect?token=${token}`)
    }

)

export default router;