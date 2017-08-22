
var assert = require('assert');
var expect  = require("chai").expect;
var request = require("request");
var requestURL ="http://localhost:3000";
var testLongTimeout = 15000;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


// "********************** jewellerTest Controller *************************"

describe('/POST jewellerData', () => {
  it('getList API first test without jeweller id', (done) => {
    let parameters = { 
    					name 	  : 'Aakarsh Ydavjiiii',
              city 	  : 'Agra',
              email   : 'aakarsh14n@gmail.com',
    					address : 'inDia',
    					pan 	  : 567567567
    				}
    chai.request(requestURL)
       .post('/userData')
       .send(parameters)
       .end((err, res) => {
          if(res.status == 202){
             done();
          }else{
          	console.log(err);
          }

        });
      
      });

    it('getList API second test with jeweller Id', (done) => {
    let parameters = { 
    					name 	: 'rahul',
    					jId 	: 21503049911338
    				}
    chai.request(requestURL)
       .post('/userData')
       .send(parameters)
       .end((err, res) => {
          if(res.status == 201){
             done();
          }else{
          	console.log(err);
          }

        });
      
      });

    it('getList API third test without any data', (done) => {
    let parameters = { 

    				}
    chai.request(requestURL)
       .post('/userData')
       .send(parameters)
       .end((err, res) => {
          if(res.status == 204){
             done();
          }else{
          	console.log(err);
          }

        });
      
      });

    it('getList API third test with mysql injection try data', (done) => {
    let parameters = { 
                        name   : 'data " or "1==1" ',
                        city   : 'Bangalore'
                    }
        chai.request(requestURL)
           .post('/userData')
           .send(parameters)
           .end((err, res) => {
              if(res.status == 201){
                 done();
              }else{
                console.log(err);
              }
            });
          
          });

    it('getList API  fourth test user Already exists', (done) => {
    let parameters = { 
                        name   : 'data " or "1==1" ',
                        email  : 'akarshgdps@gmail.com',
                        city   : 'Bangalore'
                    }
      chai.request(requestURL)
          .post('/userData')
          .send(parameters)
          .end((err, res) => {
          if(res.status == 202){
              done();
          }else{
                console.log(err);
          }
          });
                  
      });
    });


// "********************** bankTest Controller *************************"

describe('/POST bankData', () => {
  it('getList API first test without bank id', (done) => {
    let parameters = { 
    					branchName 	: 'Agra Main branch',
    					city 		    : 'Agra',
    					address 	  : 'inDia',
    					pincode 	  : 560095
    				}
    chai.request(requestURL)
       .post('/OnboardingBank')
       .send(parameters)
       .end((err, res) => {
          if(res.status == 201){
             done();
          }else{
          	console.log(err);
          }

        });
      
      });

    it('getList API second test with bank Id', (done) => {
    let parameters = { 
              branchName 	: 'Aakarsh Ydav',
              branchName 	: 'Aakarsh JI',              
    					bId 		    : 21503051727318
    				}
    chai.request(requestURL)
       .post('/OnboardingBank')
       .send(parameters)
       .end((err, res) => {
          if(res.status == 201){
             done();
          }else{
          	console.log(err);
          }

        });
      
      });

    it('getList API third test without any data', (done) => {
    let parameters = { 

    				}
    chai.request(requestURL)
       .post('/OnboardingBank')
       .send(parameters)
       .end((err, res) => {
          if(res.status == 204){
             done();
          }else{
          	console.log(err);
          }

        });
      
      });

      it('getList API third test with mysql injection data', (done) => {
        let parameters = { 
                            branchName  : ' data" or " 1==1 " ',
                            city        : 'Bangalore'
                          }
        chai.request(requestURL)
           .post('/OnboardingBank')
           .send(parameters)
           .end((err, res) => {
              if(res.status == 201){
                 done();
              }else{
                console.log(err);
              }
    
            });
          
          });
    });



// "********************** postAuction Controller *************************"

describe('/POST postAuction', () => {
  it('getList API first test without Auction id', (done) => {
    let parameters = { 
    					bank_id 	        : 345434534,
              account_number    : 6465346456,
              carat             : 12.546
    				}
    chai.request(requestURL)
       .post('/postAuction')
       .send(parameters)
       .end((err, res) => {
          if(res.status == 201){
             done();
          }else{
          	console.log(err);
          }

        });
      
      });

    it('getList API second test with Auction Id', (done) => {
    let parameters = { 
              auction_id 	: 51503131302424,            
    					bank_id     : 1111112
    				}
    chai.request(requestURL)
       .post('/postAuction')
       .send(parameters)
       .end((err, res) => {
          if(res.status == 201){
             done();
          }else{
          	console.log(err);
          }

        });
      
      });

    it('getList API third test without any data', (done) => {
    let parameters = { 

    				}
    chai.request(requestURL)
       .post('/postAuction')
       .send(parameters)
       .end((err, res) => {
          if(res.status == 204){
             done();
          }else{
          	console.log(err);
          }

        });
      
      });

      it('getList API third test with mysql injection data', (done) => {
        let parameters = { 
                            bank_id  : ' data" or " 1==1 " ',
                            carat    : 5.666
                          }
        chai.request(requestURL)
           .post('/postAuction')
           .send(parameters)
           .end((err, res) => {
              if(res.status == 201){
                 done();
              }else{
                console.log(err);
              }
    
            });
          
          });
    });