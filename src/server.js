const Hapi = require('hapi');
const Inert = require('inert');
const env = require('env2')('../config.env');
const Vision = require('vision');
const routes = require('./routes.js');
const server = new Hapi.Server();


module.exports = server;
