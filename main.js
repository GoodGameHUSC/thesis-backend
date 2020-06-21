import errorHandler from './app/middleware/http/errorHandle';
import injector from './app/middleware/http/injector';
process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rootRoute = require('./app/controllers/index');
// const cors = require("cors");
export const app = express();

require('dotenv').config()
const server = http.createServer(app);

app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/app/views/'));
app.use(injector)
// app.use(cors);

require('./app/bootstraps')

/**
 * Root URL
 */
app.use('/', rootRoute, errorHandler)

export const io = require('socket.io')(server, {
  pingInterval: 50 * 60 * 10000,
  pingTimeout: 10 * 60 * 1000,
});

require("./app/controllers/socket.io/index");

module.exports = server;
