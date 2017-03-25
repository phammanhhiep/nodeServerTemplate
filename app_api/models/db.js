var MGDB = require('../../libs/node/db').MGDB;

var host = 'localhost';
var port = 27017;	
var username = '';
var passwd = '';
var db = 'temp';

var mgdb = new MGDB (host, port, db, username, passwd);
mgdb.connect();

require('./users');