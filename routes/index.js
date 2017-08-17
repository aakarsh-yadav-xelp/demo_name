var express = require('express');
var router 	= express.Router();
var path 	= require('path');


router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
})



//********************userController #######################
var userController		= require('../controllers/userController');
router.use('/user',					userController.user 					);		//varsion
router.use('/userHome',				userController.userHome 				);		//version
router.use('/userEdit',				userController.userEdit 				);		//version
router.use('/userProfile',			userController.userProfile 				);		//version



// //*******************userMedia ############################
// var userMediaController = require('../controller/userMediaController'); 
// router.use('/uploadProfilePic',		userMediaController.userProfilePic 		); 		//version
// router.use('/uploadCoverPic',		userMediaController.userCoverPic		);		//version
// router.use('/uploadPost',			userMediaController.userPost			);		//version



// //******************bankController ########################
// var bankController		= require('../controller/bankController');
// router.use('/bankDesboard',			bankController.bankDesboard				);		//version
// router.use('/bankAuction',			bankController.bankAuction				);		//version
// router.use('/bankcancleAuction',	bankController.bankcancleAuction		);		//version



// //******************iGoldHome #############################
// var iGoldHomeController	= require('../controller/iGoldHomeController');
// router.use('/iGoldHome',			iGoldHomeController.iGoldHome 			);		//version
// router.use('/iGoldDesboard',		iGoldHomeController.iGoldDesboard 		);		//version


module.exports = router;

