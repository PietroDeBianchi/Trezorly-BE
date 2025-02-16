const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/**
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
//app.enable('trust proxy');
//app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// parse cookie
app.use(cookieParser());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors({ credentials: true, origin: true }));

// mount api v1 routes
//app.use('/api/v1', routes);

module.exports = app;
