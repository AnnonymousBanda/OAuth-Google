import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import dotenv from 'dotenv'
import { getUser, createUser } from '../toolbox.js'
dotenv.config()

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})

//declaring passport strategy(i.e., login via xyz service) and also providing the client id and url cb for the concent window
export default passport.use(
	new GoogleStrategy(
		{
			callbackURL: '/auth/google/redirect',
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
		},
		(_, __, profile, done) => {
			const id=profile.id
			const email=profile.emails[0].value
			const userName = profile.displayName;
			const userProfilePic = profile.photos[0].value;

			//checking for old users and entering new users in the local mysqldb
			// console.log(id,email,userName,userProfilePic)
			// getUser('users', profile.id)
			// 	.then((user) => {
			// 		if(!user){
			// 			return createUser('users',id,email,userName,userProfilePic)
			// 		}
			// 		done(null,user)
			// 	})
			// 	.then((user)=>{
			// 		done(null,user)
			// 	})
			// 	.catch((err) => {
			// 		console.log(err.message)
			// 	})

			done(null,{id,email,username:userName,pic:userProfilePic})//bypasing the insertion of data into local db and directly passing the user object
		}
	)
)
