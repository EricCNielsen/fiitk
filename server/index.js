require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      ctrl = require('./controller'),
      prod = require('./products.js'),
      email = require('./email'),
      pg = require('pg'),
      pgSession= require('connect-pg-simple')(session)

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

const app = express()


var pgPool = new pg.Pool({
    connectionString: CONNECTION_STRING
})

app.use(express.json())
app.use(session({
    store: new pgSession({
        pool: pgPool
    }),
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

// auth controllers

app.post('/auth/login', ctrl.login)
app.post('/auth/register', ctrl.register)
// app.get('/auth/isLoggedIn', ctrl.loggedIn)
// app.post('/auth/logout', ctrl.logout)

// // products controllers

// app.get('/products/viewAllProducts', prod.viewAll)
// app.get('/products/viewProduct', prod.viewProduct)
// app.get('/products/searchProducts', prod.searchProducts)
// app.get('/products/searchByCategory', prod.searchByCategory)
// app.post('/products/createProduct', prod.createProd)
// app.delete('/products/deleteProduct', prod.deleteProducts)
// app.put('/products/updateProductDesc', prod.updateProdDesc)
// app.put('/products/updateProductPicture', prod.updateProdPic)
// app.put('/products/updateProductName', prod.updateProdName)

// // email controllers

// app.post('/email/emailSignUp', email.signUp)
// app.post('/email/checkEmail', email.checkEmail)