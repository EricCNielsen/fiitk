require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      pg = require('pg'),
      pgSession= require('connect-pg-simple')(session),
      aws = require('aws-sdk'),
      ctrl = require('./controllers/auth'),
      prod = require('./controllers/products')
    //   email = require('./controllers/email'),

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

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
    resave: true,
    saveUninitialized: false,
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
app.get('/auth/authorized', ctrl.authorized)
app.post('/auth/logout', ctrl.logout)

// // products controllers

app.get('/api/viewAllProducts', prod.viewAll)
app.get('/api/product/:id', prod.getProduct)
app.post('/api/createProduct', prod.createProduct)
app.delete('/api/product/:id', prod.deleteProduct)
// app.put('/api/updateProductDesc', prod.updateProdDesc)
// app.put('/api/updateProductPicture', prod.updateProdPic)
// app.put('/api/updateProductName', prod.updateProdName)

// // email controllers

// app.post('/email/emailSignUp', email.signUp)
// app.post('/email/checkEmail', email.checkEmail)

// // aws end point

app.get('/sign-s3', (req, res) => {

  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    console.log(returnData)
    return res.send(returnData)
  });
});