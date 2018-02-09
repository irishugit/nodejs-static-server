/*
* @Author: iris hu
* @Date:   2018-02-08 21:52:54
* @Last Modified by:   sigou
* @Last Modified time: 2018-02-08 22:56:44
*/
const server = require('./server/startServer');
const config = require('./config/server.config');

server.start(config);