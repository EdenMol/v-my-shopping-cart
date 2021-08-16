const express = require('express');
const path = require("path")
const { port } = require('./config');
const connect = require('./db');
const formidableModdleware = require("express-formidable")
const cors = require('cors')

//Init app
const app = express()
app.use(cors())
// app.use(express.json())

//Formidable middleware
app.use(formidableModdleware())


//Set public folder
app.use(express.static(path.join(__dirname, "public")))

/**  Add headers */
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

// Set routes
const pages = require('./routes/pages')
const categories = require('./routes/categories')
const products = require('./routes/products')
const orders = require('./routes/orders')
const auth = require('./routes/auth')

app.use('/pages', pages)
app.use('/categories', categories)
app.use('/products', products)
app.use('/orders', orders)
app.use('/auth', auth)




connect()
    .then(() => {

        console.log('db is connected');

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch("error", console.error.bind(console, "Connection ERROR"))