// var db 			= require('../config/db_config');


var user = function (req,res){
	res.send('User Authenticated');
	return 1;

}
var userHome = function(req,res){
	res.send('UserHome Access');
	return true
}
var userEdit = function(req,res){
	res.send('UserEdit Access');
}
var userProfile = function(req,res){
	res.send('userProfile Access');
}




module.exports = {
	user 		: 	user,
	userHome 	: 	userHome,
	userEdit 	: 	userEdit,
	userProfile : 	userProfile
}