var express = require('express');
var router 	= express.Router();
var path 	= require('path');


router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
})


//********************userController #######################
var userController		= require('../controllers/userController.js');
router.use('/userHome',				    userController.userHome 			      	);		//version
router.post('/userData',			    userController.onBoardingJewel			  );		//version
router.post('/OnboardingBank',		userController.onBoardingBank 		    );		//version



// //*******************Auction ############################
var auctionController   = require('../controllers/auction'); 
router.post('/postAuction',		    auctionController.postAuction 		    ); 		//version
router.use('/fetchAuction',  		auctionController.fetchAuction	    	);		//version
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

