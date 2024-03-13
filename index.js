import express from 'express'
import path from 'path'
import { __dirname } from './toolbox.js'
import auth from './routes/authRoutes.js'
import passportSetup from './config/passport-setup.js'//makes the passportSetup execute on being imported
import session from 'express-session'
import passport from 'passport'

const app = express()

app.set('view engine','ejs');

app.use(express.static('public'))

//cookies initialization
app.use(
	session({
	  secret: "TOPSECRETWORD",
	  resave: false,
	  saveUninitialized: true,
	  cookie: {
		maxAge: 24 * 60 * 60 * 1000,
	  }
	})
  );
  

app.use(passport.initialize())
app.use(passport.session())

const port = 3000

app.get('/', (req, res) => {
	res.sendFile(path.join('public', 'views', 'index.html'), { root: __dirname })
})

app.use('/auth', auth)

app.listen(port, () => {
	console.log('Server is live at ', port)
})
