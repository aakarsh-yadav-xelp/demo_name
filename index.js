var dateFormat 	= require('dateformat');
var now 		= new Date();
var bcrypt 		= require('bcrypt');
var express 	= require('express');
var app 		= express();
var path		= require('path');
var router		= require('./routes/index');
var chai 		= require('chai');
var bodyParser  = require("body-parser");


process.env.NODE_ENV = '../controller/mocha_test';


// ******************urlencod to Json ###################
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ******************public Access directory ############
app.use('public',express.static(__dirname + '/public'));
app.use('/uploads',express.static('uploads'))


// ******************Starting Server ####################
app.use('/',router);
var server = app.listen(3000,function(){
	console.log('Server is starting on localhost:'+server.address().port);
})

