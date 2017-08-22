const express 		= require('express');
const app			= express();
const bodyParser 	= require('body-parser');
const router 		= require('./routes/index');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.use('/',router);

var server 			= app.listen(3000,function(){
	console.log('Server is started on port 3000');
});
