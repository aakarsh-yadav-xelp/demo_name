var express    = require('express');
var db         = require('mysql');

var mysqlConnect = function(){
    var conbox = db.createPool({
        connectionLimit     : 200, //increase limit for multiple connections
        waitForConnections  : true,
        queueLimit          : 150000, // resource dedication for particular query
        acquireTimeout      : 172800000, // pending query time out
        connectTimeout      : 172800000,// each connection life cycle time
        host                : 'localhost',
        user     	    	: 'root',
        password 	    	: '',
        database 	    	: 'db_igold',
        dateStrings         : 'date',
        multipleStatements  : false,
        rejectUnauthorized  : true
    });
    
conbox.query('SELECT 1', function(err){
    if (err) {
        conbox.end();
        console.log(err.code);
        console.log(err.fatal);
    }
});
    
    return conbox;
};
module.exports.localConnect = mysqlConnect;