import express from "express"
import path from 'path'
import { __dirname } from '../toolbox.js'

const router = express.Router()

// router.set('views', path.join(__dirname, 'view'));

router.use((req, res, next) => {
    if (req.isAuthenticated()) { 
        next()
    } else {
        res.redirect('/auth/login')
    }
})

router.get('/',(req,res)=>{
	console.log( req.user)
    const username=req.user.username
    const profilePic=req.user.pic
    const userEmail=req.user.email
	// res.sendFile(path.join('public', 'view', 'profile.html'), { root: __dirname })
    res.render('../public/views/profile.ejs', { username, profilePic, userEmail });
})

export default router
