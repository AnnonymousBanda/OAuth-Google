import express from 'express'
import path from 'path'
import { __dirname } from '../toolbox.js'
import passport from 'passport'
import route from './profileRoutes.js'

const router = express.Router()

router.use('/profile',route)

router.get('/login', (req, res) => {
	res.sendFile(path.join('public', 'views', 'login.html'), { root: __dirname })
})

router.get('/logout', (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err)
		}
		res.redirect('/login')
	})
})

//user is encountered with the consent window
router.get('/google', passport.authenticate('google',{
	scope:['profile','email']//we only want to access the profile of the user
}))

router.get('/google/redirect',passport.authenticate('google',{ failureRedirect: '/login' }),(req,res)=>{
	console.log("You have successfully logged in")
	res.redirect('/auth/profile')
})

export default router
