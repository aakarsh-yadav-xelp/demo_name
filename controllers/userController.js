const db 					= require('../database/db_config_mysql').localConnect();
const path 					= require('path');
const ValidationClass    	= require('../helper/validationCheck.js');
const validationCheckObj 	= new ValidationClass();
var generateIdClass    		= require('../helper/validationCheck.js');
var generateIdObj      		= new generateIdClass();
var logger 					= require('../logging/logger');
const constants 			= require('../helper/constants');
const MEDIUM_QUERY			= constants.MEDIUM_QUERY;
const mysql 				= require('mysql');


// **********************onboarding Data form for temporary*********************

var userHome = function (req,res){
	res.sendFile(path.join(__dirname+'/../public/views/index.html'));
	return 1;
}

// **********************jeweller onboarding Data ******************************

var addJewellerData 	= function(req,res,next){
	var userGeneralSql 			= '';
	var adminGenrelSqlColumn 	= '';
	var userSqljId				= '';
	var error 					= '';
	var retArr 					= '';
	var data 					= [];
	var sql_insert 				= "Insert into tbl_jeweller_master set";
	var async 					= require('async');


	if(!Object.keys(req.body).length)
	{
		error.errCode 	= 0;
		error.errMsg 	= 'Too long excuted query';
		retArr.result 	= [];
		retArr.error 	= error;
		res.status(204);
		res.json(retArr);
		return 1;
	}

	
	if(validationCheckObj.checkEmpty(req.body.name)){
		if(userGeneralSql !== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' fname = ' + mysql.escape(req.body.name) + '';
	}

	if(validationCheckObj.checkEmpty(req.body.address)){
		if(userGeneralSql !== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' address = ' + mysql.escape(req.body.address) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.city)){
		if(userGeneralSql !== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' city = ' + mysql.escape(req.body.city) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.state)){
		if(userGeneralSql !== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' state = ' + mysql.escape(req.body.state) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.pincode)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' pincode = ' + mysql.escape(req.body.pincode) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.email)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' email = ' + mysql.escape(req.body.email) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.password)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' password = ' + mysql.escape(req.body.password) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.businessName)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' business_name = ' + mysql.escape(req.body.businessName) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.contact)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' contact = ' + mysql.escape(req.body.contact) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.aadhar)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' aadhar = ' + mysql.escape(req.body.aadhar) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.pan)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' pan = ' + mysql.escape(req.body.pan) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.accountNumber)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' account_number = ' + mysql.escape(req.body.account_number) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.ifsc)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' ifsc = ' + mysql.escape(req.body.ifsc) + ''; 
	}


	if(!validationCheckObj.checkEmpty(req.body.jId)){
		jId 	= generateIdObj.generateId();
		userSqljId 	+= 'jeweller_id ="' + jId + '"';
	}else{
		userSqljId += ' jeweller_id =' + mysql.escape(req.body.jId) + '';
	}

	userGeneralSql 	+= ', active_flag = 1';
	/* 		code for temporary data structure 
					   check mail id for user 
									 in db */
		if(validationCheckObj.checkEmpty(req.body.email))
		{
			jewellerEmail 	= ' email = ' + mysql.escape(req.body.email) + ''; 
		}else
		{
			emailTemp = 'dataTemp';
			jewellerEmail 	= ' email = ' + mysql.escape(emailTemp) + ''; 
		}

	// end of temp data for jewellers 

	sqlCheck 	= 'Select count(1) as count_data from tbl_jeweller_master where ' + jewellerEmail + ' and active_flag=1';
	db.query({sql:sqlCheck,timeout : MEDIUM_QUERY},function(err, rows , fields){
		if(err && err.Code === 'PROTOCOL_SEQUENCE_TIMEOUT')
		{	
			logger.error('API from Check user Exist');
			logger.error('Too long excuted query');
			logger.error(sqlCheck);
			logger.error(err);
			error.errCode 	= 0;
			error.errMsg 	= 'Too long excuted query';
			retArr.result 	= [];
			retArr.error 	= error;
			res.status 		= 408;
			res.json(resArr);
			return 1;
		}else if(rows)
		{	
			if(rows[0].count_data)
			{

				error.code 		= 1;
				error.errMsg 	= 'User Already Exist'; 
				retArr.results 	= []; 
				retArr.error 	= error;
				res.status(202);
				res.json(retArr);
				return 1;
			}else{
				
				var sql 	=	sql_insert +' ' + userSqljId + ' , '+ userGeneralSql +' , created_on = now() on duplicate key update '+ userGeneralSql +' ';	
				db.query({sql:sql,timeout: MEDIUM_QUERY},function(err, rows ,fields){

					if(err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT')
					{

						logger.error('API from Add User');
						logger.error('Too long excuted query');
						logger.error(sql);
						logger.error(err);	
						error.errCode 	= 0;
						error.errMsg 	= 'Too long excuted query';
						retArr.result 	= [];
						retArr.error 	= error;
						res.status(408)
						res.json(resArr);
						return 1;
					}
					if(err)
					{	
						
						logger.info(sql);
						logger.error(err);
						error.errCode 	= 0;
						error.errMsg  	= 'Error in Add User Data';
						retArr.result 	= [];
						retArr.error  	= error;
						res.status(400);
						res.json(retArr);
						return true;
					}
					if(rows)
					{
						req.body.jId 	= jId;
						error.code 		= 1;
						error.errMsg	= "Successfully update data";
						retArr.result 	= [];
						retArr.error 	= [];
						retArr.result 	= req.body;
						retArr.error 	= error;
						res.status(201);
						res.json(retArr);
						return true;
					}
				})
			}
		}

	})
}

// ************************Bank Onboarding form data ***************************
var addBankData 		= function(req,res,next){
	var userGeneralSql 			= '';
	var adminGenrelSqlColumn 	= '';
	var userSqlbId				= '';
	var error 					= '';
	var retArr 					= '';
	var data 					= [];
	var sql_insert 				= "Insert into tbl_bank_master set";
	var async 					= require('async');


	if(!Object.keys(req.body).length)
	{
		error.errCode 	= 0;
		error.errMsg 	= 'Too long excuted query';
		retArr.result 	= [];
		retArr.error 	= error;
		res.status(204);
		res.json(retArr);
		return 1;
		
	}

	
	if(validationCheckObj.checkEmpty(req.body.branchName)){
		if(userGeneralSql !== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' bank_branch = ' + mysql.escape(req.body.branchName) + '';
	}

	if(validationCheckObj.checkEmpty(req.body.userName)){
		if(userGeneralSql !== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' user_name = ' + mysql.escape(req.body.userName) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.branchAddress)){
		if(userGeneralSql !== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' branch_address = ' + mysql.escape(req.body.branchAddress) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.city)){
		if(userGeneralSql !== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' city = ' + mysql.escape(req.body.city) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.state)){
		if(userGeneralSql !== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' state = ' + mysql.escape(req.body.state) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.pincode)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' pin_code = ' + mysql.escape(req.body.pincode) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.email)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' email = ' + mysql.escape(req.body.email) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.password)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' password = ' + mysql.escape(req.body.password) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.loanManagerName)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' loan_manager_name = ' + mysql.escape(req.body.loanManagerName) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.contact)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' branch_contact = ' + mysql.escape(req.body.contact) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.branchPoolAccountNumber)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' branch_pool_account_number = ' + mysql.escape(req.body.branchPoolAccountNumber) + ''; 
	}

	if(validationCheckObj.checkEmpty(req.body.ifsc)){
		if(userGeneralSql 	!== '')
		{
			userGeneralSql 	+= ',';
		}
		userGeneralSql 		+= ' ifsc = ' + mysql.escape(req.body.ifsc) + ''; 
	}

	if(!validationCheckObj.checkEmpty(req.body.bId)){

		bId 	= generateIdObj.generateId();
		userSqlbId 	+= 'bank_id ="' + bId + '"';
	}else{
		
		userSqlbId += ' bank_id =' + mysql.escape(req.body.bId) + '';
	}

	userGeneralSql 			+= ', active_flag = 1';
	/* 		code for temporary data structure 
					   check mail id for user 
									 in db */
	if(validationCheckObj.checkEmpty(req.body.userName))
	{
		bankUserName 	= ' user_name = ' + mysql.escape(req.body.userName) + ''; 
	}else
	{
		userNameTemp = 'dataTemp';
		bankUserName 	= ' user_name = ' + mysql.escape(userNameTemp) + ''; 
	}
								
									// end of temp data for jewellers 
								

	sqlCheck 	= 'Select count(1) as count_data from tbl_bank_master where ' + bankUserName + ' and active_flag=1';
	db.query({sql:sqlCheck,timeout : MEDIUM_QUERY},function(err, rows , fields){
		
		if(err && err.Code === 'PROTOCOL_SEQUENCE_TIMEOUT')
		{	
			logger.error('API from Check user Exist');
			logger.error('Too long excuted query');
			logger.error(sqlCheck);
			logger.error(err);
			error.errCode 	= 0;
			error.errMsg 	= 'Too long excuted query';
			retArr.result 	= [];
			retArr.error 	= error;
			res.status(408);
			res.json(resArr);
			return 1;
		}else if(rows)
		{	
			if(rows[0].count_data)
			{

				error.code 		= 1;
				error.errMsg 	= 'User Already Exist'; 
				retArr.results 	= []; 
				retArr.error 	= error;
				res.status(202);
				res.json(retArr);
				return 1;
			}else{
				
				var sql 	=	sql_insert +' ' + userSqlbId + ' , '+ userGeneralSql +' , created_on = now() on duplicate key update '+ userGeneralSql +' ';	
				db.query({sql:sql,timeout: MEDIUM_QUERY},function(err, rows ,fields){
			
					if(err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT')
					{
						logger.error('API from Add User');
						logger.error('Too long excuted query');
						logger.error(sql);
						logger.error(err);	
						error.errCode 	= 0;
						error.errMsg 	= 'Too long excuted query';
						retArr.result 	= [];
						retArr.error 	= error;
						res.status(408);
						res.json(resArr);
						return 1;
					}
					if(err)
					{	
						logger.info(sql);
						logger.error(err);
						error.errCode 	= 0;
						error.errMsg  	= 'Error in Add User Data';
						retArr.result 	= [];
						retArr.error  	= error;
						res.status(400);
						res.json(retArr);
						return true;
					}
					if(rows)
					{

						req.body.bId 	= bId;
						error.code 		= 1;
						error.errMsg	= "Successfully update data";
						retArr.result 	= [];
						retArr.error 	= [];
						retArr.result 	= req.body;
						retArr.error 	= error;
						res.status(201);
						res.json(retArr);
						return true;
					}
				})
			}
		}

	})
}


var userEdit = function(req,res){
	res.send('UserEdit Access');
}
var userProfile = function(req,res){
	res.send('userProfile Access');
}


module.exports = {
	userHome 		: 	userHome,
	userEdit 		: 	userEdit,
	onBoardingJewel	:   addJewellerData,
	onBoardingBank	: 	addBankData,
	userProfile 	: 	userProfile
}
