require('dotenv').config()
const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      sessions = require('express-session'),
      ctrl = require('./controller')

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

const app = express()

app.use(bodyParser.json())
app.use(sessions({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}))
      
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)

    console.log(`db checking in`)
    app.listen(SERVER_PORT, () => {
        console.log(`I C U on port ${SERVER_PORT}`)
    })
})