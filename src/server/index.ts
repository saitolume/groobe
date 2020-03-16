import express, { Request, Response } from 'express'
import session from 'express-session'
import http from 'http'
import next from 'next'
import passport from 'passport'
import uid from 'uid-safe'
import { appleStrategy } from './strategies/apple'
import { spotifyStrategy } from './strategies/spotify'
import { env } from '../constants/env'

const { PORT, IS_DEV } = env
const app = next({ dev: IS_DEV })
const handle = app.getRequestHandler()

const sessionConfig = {
  secret: uid.sync(18),
  cookie: {
    maxAge: 86400 * 1000 // 24 hours in milliseconds
  },
  resave: false,
  saveUninitialized: true
}

app.prepare().then(() => {
  const server = express()
  server.use(session(sessionConfig))

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))
  passport.use(appleStrategy)
  passport.use(spotifyStrategy)

  server.use(passport.initialize())
  server.use(passport.session())

  server.get('/sign-in-with-apple', passport.authenticate('apple'))
  server.post(
    '/sign-in-with-apple/callback',
    express.urlencoded({ extended: true }),
    passport.authenticate('apple', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/')
    }
  )

  server.get('/sign-in-with-spotify', passport.authenticate('spotify'))
  server.get(
    '/sign-in-with-spotify/callback',
    passport.authenticate('spotify', { scope: [], failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/')
    }
  )

  server.get('*', (req: Request, res: Response) => handle(req, res))

  http.createServer(server).listen(PORT, () => {
    console.log(`[ info ]  listening on http://localhost:${PORT}`)
  })
})
