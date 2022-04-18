const express = require('express');
const morgan = require('./config/morganConfig');
const router = require('./routes/APIroutes');
require('dotenv').config();
require('./config/mongoConfig')
const compression = require('compression')

const app = express()
const port = 3000;


app.use(compression())
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use((req, res, next) => {
    return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

app.listen(port, () => { console.log(`listening on port ${port}`) })
