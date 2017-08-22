(function () {

var express = require('express');
var crypto = require('crypto');
const fs = require('fs');


'use strict';

module.exports =  ValidationClass= function(){
    this.id =   0;
};




ValidationClass.prototype.checkEmpty = function(val){
    if (val === '' || val === null || typeof val === 'undefined'  || val ==='null' ||val == 'null'||val == undefined||val == 'undefined') {
        return false;
    } else {
        return true;
    }
};


ValidationClass.prototype.checkNull = function(val){
    if (val === null || typeof val === 'undefined'  || val ==='null' ||val == 'null'||val == undefined||val == 'undefined'|| val ==="null" ||val == "null" ) {
        return '';
    } else {
        return val;
    }
};

ValidationClass.prototype.checkEmptyAllowBlank = function(val){
    if (val === null || typeof val === 'undefined') {
        return false;
    } else {
        return true;
    }
};


ValidationClass.prototype.checkEmpty0 = function(val){

    if (val) {
        return false;
    } else {
        return true;
    }
};
ValidationClass.prototype.checkIsUndefined = function(val){

    if (val) {
        return false;
    } else {
        return true;
    }
};
ValidationClass.prototype.nameInitials = function(name){
  var nm = name.split(" ");
  var nms ="";
    if (nm.length > 1)
        nms = (nm[0].charAt(0)).toUpperCase() + " " + (nm[1].charAt(0)).toUpperCase();
    else
        nms = (name.charAt(0)).toUpperCase();

    return nms;
};


ValidationClass.prototype.getOptimizedImages = function(allPhotos){
    var allPhotosArray = (allPhotos ? allPhotos.split(',') : []);
    return allPhotosArray;
};

ValidationClass.prototype.getOptimizedSigleImage = function(selectedPhoto){
    var allPhotosArray = (selectedPhoto ? selectedPhoto.split(',') : []);
    return allPhotosArray[0];
};

ValidationClass.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

ValidationClass.prototype.generateId = function () {
    var dTime = new Date().getTime();
    var genaratedId;
    var rNum = this.getRandomInt(1, 9);
    genaratedId = '' + rNum + '' + dTime;
    return genaratedId;
};



ValidationClass.prototype.getId = function () {
    var dTime = new Date().getTime();
    var genaratedId;
    var rNum = this.getRandomInt(1, 9);
    genaratedId = '' + rNum + '' + dTime;
    return genaratedId;
};

ValidationClass.prototype.expiresIn = function(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
};


ValidationClass.prototype.decrypt = function(text) {
    var algorithm = 'aes-256-ctr';
    var password = 'd6F3Efeq';
    var decipher = crypto.createDecipher(algorithm,password);
    try{
        var dec = decipher.update(text,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    }
     catch (ex) {
        return -1;
    }
};


 ValidationClass.prototype.validateIdForInjection = function(params,max) {
    var MAX = max;
    var flags = (params ? params.split('|@|') : []);
    flags.forEach(function(vl,i){
        var length = vl.length;
        var flg =  parseInt(vl);
        if(flg > MAX || (vl.length)>3)
        flags.splice(i,1);
    });
    flags = (flags ? flags.join() : []);
    return flags;
};



 ValidationClass.prototype.validateMultipleActiveFlags = function(params,max) {
    var MAX = max;
    var flags = (params ? params.split('|@|') : []);
    flags.forEach(function(vl,i){
        var flg =  (parseInt(vl)?parseInt(vl):null);
        if(!(flg) || (vl.length)>2)
        flags.splice(i,1);
    });
    flags = (flags ? flags.join() : null);
    return flags;
};

ValidationClass.prototype.validateFeatures = function(params,min,max) {
     console.log();
    var flags = (params ? params.split('|@|') : []);
    var _this=this;
    flags.forEach(function(vl,i){
        console.log(vl);
        if (!isNaN(Number(vl))){
            if(_this.checkEmpty0(vl) && (vl.toString().length < min &&(vl.toString().length <= max))){
                flags.splice(i,1);
            }
        }else{
            flags.splice(i,1);
        }
    });
    return flags;
};



 ValidationClass.prototype.validateTags = function(params,min,max) {
     console.log();
    var flags = (params ? params.split('|@|') : []);
    var _this=this;
    flags.forEach(function(vl,i){
        console.log(vl);
        if (vl){
            if(_this.checkEmpty0(vl) && (vl.toString().length < min &&(vl.toString().length <= max))){
                flags.splice(i,1);
            }
        }else{
            flags.splice(i,1);
        }
    });
    return flags;
};
 ValidationClass.prototype.validateHomeType = function(params,min,max) {
    var flags = (params ? params.split('|@|') : []);
    var _this=this;
    flags.forEach(function(vl,i){
        if (!isNaN(Number(vl))){
            if(_this.checkEmpty0(vl) && (vl.toString().length < min &&(vl.toString().length <= max))){
                flags.splice(i,1);
            }
        }else{
            flags.splice(i,1);
        }
    });
    return flags;
};






ValidationClass.prototype.validateLt =  function(id){
    if (!isNaN(Number(id))){
            if(id<50)
                return id;
            else
                return 50;
        } else {
            return 50;
      }

};
ValidationClass.prototype.validateSt =  function(id){
    if (!isNaN(Number(id))){
            return id;
    } else {
            return 10;
    }
};

ValidationClass.prototype.validateLatLong  =  function(id){
    if (!isNaN(Number(id))){

            return id;

    } else {
        return null;
    }
};

ValidationClass.prototype.validateOtp =  function(id){
        if (id.toString().length >= 4 && id.toString().length <= 6 ) {
            return id;
        } else {
            return null;
        }

};




ValidationClass.prototype.validateID =  function(id){
    if (!isNaN(Number(id))){
        if ((id.toString().length >= 14 )&&(id.toString().length <= 18)) {
            return id;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

ValidationClass.prototype.validateIDStrict =  function(id){
    var MIN = 14;
    var MAX = 18;

    if (!isNaN(Number(id))){
        if(!this.checkEmpty0(id)){

            return id;
        }
         else if ((id.toString().length >= MIN )&&(id.toString().length <= MAX)) {
            return id;
        } else {
            throw new Error('Invalid id digits',1212);
        }
    }
    else if(!this.checkEmpty0(id)){
         return id;
    }
    else {
        throw new Error('Invalid id number',1000);
    }
};

ValidationClass.prototype.validateIDWithZero =  function(id){
    var MIN = 12;
    var MAX = 18;

    if (!isNaN(Number(id))){

        if(!this.checkEmpty0(id)){

            return id;
        }
         else if ((id.toString().length >= MIN )&&(id.toString().length <= MAX)) {
            return id;
        } else {
             return null;
        }
    }
    else if(!this.checkEmpty0(id)){
         return id;
    }
    else {
        return 0;
    }
};
ValidationClass.prototype.validateIDWithNull =  function(id){
    var MIN = 14;
    var MAX = 18;

    if (!isNaN(Number(id))){
        if(!this.checkEmpty0(id)){

            return id;
        }
         else if ((id.toString().length >= MIN )&&(id.toString().length <= MAX)) {
            return id;
        } else {
           return null;
        }
    }
    else if(!this.checkEmpty0(id)){
         return id;
    }
    else {
        return null;
    }
};
ValidationClass.prototype.validateIDWithOne =  function(id){
    var MIN = 14;
    var MAX = 18;

    if (!isNaN(Number(id))){
        if(!this.checkEmpty0(id)){

            return id;
        }
         else if ((id.toString().length >= MIN )&&(id.toString().length <= MAX)) {
            return id;
        } else {
            throw new Error('Invalid id digits',1212);
        }
    }
    else if(!this.checkEmpty0(id)){
         return id;
    }
    else {
        return 1;
    }
};
ValidationClass.prototype.validateIDAllowNull =  function(id){
    var MIN = 14;
    var MAX = 18;
    if(id === '' || id === "")
    {
        return id;
    }
    else
    {
        if (!isNaN(Number(id))){
            if ((id.toString().length >= MIN )&&(id.toString().length <= MAX)) {
                return id;
            } else {
               // throw new Error('Invalid id digits',1212);
               return null;
            }
        } else {
           // throw new Error('Invalid id number',1000);
            return null;
        }
    }
};

ValidationClass.prototype.validatePostalCode  =  function(value){
    var MIN = 4;
    var MAX = 8;
    if ((value.toString().length >= MIN )&&(value.toString().length <= MAX)) {
        return value;
    } else {
       return null;
    }
};
ValidationClass.prototype.validatePType =  function(value){
     if (!isNaN(Number(value))){
        if (value > 0 && value < 10 ) {
            return value;
        } else {
            return null;
        }
    } else {
        return null;
    }
};
ValidationClass.prototype.validateHomeJsonType =  function(value){
     if (!isNaN(Number(value))){
        if (value > 0 && value < 10 ) {
            return value;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

ValidationClass.prototype.extractValues =  function(value){
    if(value){
        var typeids = value.split('|@|');
        var temptids = [];
        if (typeids.length) {
            typeids.forEach(function (vl, i) {
                temptids.push(vl);
            });
        }
        var tids2 =temptids.join(',');
        if(tids2== '')
            tids2='';     
    }
    return tids2;
};

ValidationClass.prototype.validatePTypeNull =  function(value){
     if (!isNaN(Number(value))){
        if (value > 0 && value < 10 ) {
            return value;
        } else {
           return null;
        }
    } else {
        return null;
    }
};

ValidationClass.prototype.validatePrizeForInjection = function(prize) {
   prize = parseFloat(prize);
   return prize;
 };

ValidationClass.prototype.base64ToImageURL = function(data,id) {
    var imageBuffer = data.replace(/^data:image\/png;base64,/, "");
    imageBuffer = new Buffer(imageBuffer, 'base64');
    console.log(imageBuffer);
    fs.writeFile("uploads/uploads/sharable/"+id+".jpg", imageBuffer, function(err) {
       console.log(err);
       console.log("*********************");
       console.log(id);
       console.log("*********************");
    });
};


ValidationClass.prototype.removeDuplicateArrayElement = function(arr1,arr2,uid) {
    var obj = {};
    var array = [];
    var count = 0;
    //console.log(uid);
    for (var y=0; y<arr1.length; y++ ) { 
        for (var x=0; x<arr2.length; x++ ) { 
            if((arr1[y]['bucket_id'] == arr2[x]['bucket_id']) || (arr1[y]['uid']==uid) ){
                count++;
                
            }
        }
        if(count==0){
            array.push(arr1[y]);
        }
        count = 0;
    }
    return array;
}


}());
