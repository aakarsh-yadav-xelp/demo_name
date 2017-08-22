const db                      = require("../database/db_config_mysql").localConnect();
const path                    = require("path");
const ValidationClass         = require("../helper/validationCheck.js");
const validationCheckObj      = new ValidationClass();
var generateIdClass           = require("../helper/validationCheck.js");
var generateIdObj             = new generateIdClass();
var logger                    = require("../logging/logger");
const constants               = require("../helper/constants");
const MEDIUM_QUERY            = constants.MEDIUM_QUERY;
const mysql                   = require("mysql");

var postAuction = function(req, res, next) {
  let error = {};
  let retArr = {};
  let generalSql = "";
  let sql = "insert into tbl_auction set ";

  if (!Object.keys(req.body).length) {
    error.errCode = 0;
    error.errMsg = "No Data send on requested time";
    retArr.result = [];
    retArr.error = error;
    res.status(204);
    res.json(retArr);
    return 1;
  }

  if (validationCheckObj.checkEmpty(req.body.bank_name)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql += " bank_name = " + mysql.escape(req.body.bank_name) + " ";
  }
  if (validationCheckObj.checkEmpty(req.body.bank_branch)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql += " bank_branch = " + mysql.escape(req.body.bank_branch) + " ";
  }
  if (validationCheckObj.checkEmpty(req.body.bank_id)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql += " bank_id = " + mysql.escape(req.body.bank_id) + " ";
  }
  if (validationCheckObj.checkEmpty(req.body.bank_state)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql += " bank_state = " + mysql.escape(req.body.bank_state) + " ";
  }
  if (validationCheckObj.checkEmpty(req.body.bank_city)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql += " bank_city = " + mysql.escape(req.body.bank_city) + " ";
  }
  if (validationCheckObj.checkEmpty(req.body.account_number)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql +=
      " account_no = " + mysql.escape(req.body.account_number) + " ";
  }
  if (validationCheckObj.checkEmpty(req.body.bank_pin_code)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql +=
      " bank_pin_code = " + mysql.escape(req.body.bank_pin_code) + " ";
  }
  if (validationCheckObj.checkEmpty(req.body.carat)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql += " carat = " + mysql.escape(req.body.carat) + " ";
  }
  if (validationCheckObj.checkEmpty(req.body.auctionDate)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql += " timedata = " + mysql.escape(req.body.auction_date) + " ";
  }
  if (validationCheckObj.checkEmpty(req.body.emdPayingPage)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql += " emd_paying_page = " + mysql.escape(req.body.emd) + " ";
  }
  if (validationCheckObj.checkEmpty(req.body.emd_last_date)) {
    if (generalSql !== "") {
      generalSql += ",";
    }
    generalSql +=
      " emd_last_date = " + mysql.escape(req.body.emd_last_date) + " ";
  }
  /* checking auction data for insert
                 or update in database
                                     */
  if (validationCheckObj.checkEmpty(req.body.auction_id)) {
    var keySql = "auction_id = " + mysql.escape(req.body.auction_id);
  } else {
    let auctionId = generateIdObj.generateId();
    var keySql = " auction_id = " + auctionId + "";
  }

  generalSql += ", created_on= now() ,active_flag= 1, auction_type = 1 "; // auction type 1- Active | 2- Closed | 3- Cancelled
  sql +=
    " " +
    keySql +
    " , " +
    generalSql +
    " on duplicate key update " +
    generalSql +
    " ";

  db.query({ sql: sql, timeout: MEDIUM_QUERY }, function(err, rows, fields) {
    if (err && err.code === "PROTOCOL_SEQUENCE_TIMEOUT") {
      logger.error("API from postAuction");
      logger.error("too long to execute query");
      logger.error(sql);
      logger.error(err);
      res.status(408);
      res.json({ data: "retArr" });
    } else if (err) {
      logger.info(sql);
      logger.error(err);
      error.errCode = 1;
      error.errMsg = "Error in postAuction Query";
      retArr.error = error;
      res.status(400);
      res.json(retArr);
      return 1;
    } else {
      error.errCode = 0;
      error.errMsg = "Auction added successfully";
      retArr.error = error;
      res.status(201);
      res.json(retArr);
    }
  });
};

                              // bank_name as bank_name, \n\
                              // bank_branch as bank_branch,\n\
                              // bank_city as bank_city,\n\
                              // bank_state as bank_State,\n\
                              // bank_pincode as bank_pincode,\n\


// ***************************** create SelectAuction Controller ***************************
var fetchAuction = function(req, res, next) {
  var err             = [];
  var retArr          = [];
  var auctionSql      = [];
  var error           = [];
  let auctionType     = null;
  var sql             = '';
  let sql_single      = 'Select \n\
                              tbl_auction.emd_paying_page as emd, \n\
                              tbl_auction.account_no as account_no, \n\
                              tbl_auction.carat as carat, \n\
                              tbl_auction.min_amount as min_amount, \n\
                              tbl_auction.no_packet as no_packet, \n\
                              tbl_auction.features_packet as featurs_packet,\n\
                              tbl_bank_master.user_name as bank_username,\n\
                              tbl_bank_master.branch_address as branch_address,\n\
                              tbl_bank_master.bank_branch as bank_branch,\n\
                              tbl_bank_master.city as bank_city,\n\
                              tbl_bank_master.state as bank_state,\n\
                              tbl_bank_master.pin_code as bank_pincode,\n\
                              tbl_bank_master.loan_manager_name as loan_manager_name,\n\
                              tbl_bank_master.branch_contact as bank_contact,\n\
                              tbl_bank_master.ifsc as bank_ifsc \n\
                              from tbl_auction \n\
                              LEFT JOIN \n\
                              tbl_bank_master \n\
                              ON tbl_auction.bank_id=tbl_bank_master.bank_id';
  let sql_all         = 'Select \n\
                              tbl_auction.emd_paying_page as emd, \n\
                              tbl_auction.account_no as account_no, \n\
                              tbl_auction.carat as carat, \n\
                              tbl_auction.min_amount as min_amount, \n\
                              tbl_auction.no_packet as no_packet, \n\
                              tbl_auction.features_packet as featurs_packet,\n\
                              (CASE \n\
                                WHEN DATE_ADD(tbl_auction.created_on,INTERVAL 3 HOUR )> now() AND (now()>tbl_auction.created_on) AND tbl_auction.auction_type=1 THEN "1" \n\
                                WHEN DATE_ADD(tbl_auction.created_on,INTERVAL 3 HOUR )< now() AND tbl_auction.auction_type=1 THEN "2"  \n\
                                WHEN tbl_auction.auction_type=2 THEN "3" \n\
                                WHEN tbl_auction.auction_type=3 THEN "4" \n\
                                END \n\
                              ) as type,\n\
                              tbl_bank_master.user_name as bank_username,\n\
                              tbl_bank_master.branch_address as branch_address,\n\
                              tbl_bank_master.bank_branch as bank_branch,\n\
                              tbl_bank_master.city as bank_city,\n\
                              tbl_bank_master.state as bank_state,\n\
                              tbl_bank_master.pin_code as bank_pincode,\n\
                              tbl_bank_master.loan_manager_name as loan_manager_name,\n\
                              tbl_bank_master.branch_contact as bank_contact,\n\
                              tbl_bank_master.ifsc as bank_ifsc \n\
                              from tbl_auction \n\
                              LEFT JOIN \n\
                              tbl_bank_master \n\
                              ON tbl_auction.bank_id=tbl_bank_master.bank_id';


  
  if(!validationCheckObj.checkEmpty(req.body.auction_id))
    {
      auctionId     = mysql.escape(req.body.auction_id);
    }
  if(!validationCheckObj.checkEmpty(req.body.type))
    {
      auctionType   = req.body.auction_type;
    }
    console.log(auctionType);
    switch(auctionType)
    {
      case 1:
      {
        sql = sql_single + ' where DATE_ADD(tbl_auction.created_on,INTERVAL 3 HOUR )> now() AND (now()>tbl_auction.created_on) AND tbl_auction.auction_type=1 AND tbl_bank_master.active_flag=1';
        break;
      }
      case "2":
      {
        sql = sql_single + ' where DATE_ADD(tbl_auction.created_on,INTERVAL 3 HOUR )< now() AND tbl_auction.auction_type=1 AND tbl_bank_master.active_flag=1'
        break;
      }
      case 3:
      {
        sql = sql_single + ' where tbl_auction.auction_type=2 AND tbl_bank_master.active_flag=1';
        break;
      }
      case 4:
      {
        sql = sql_single + ' where tbl_auction.auction_type=3 AND tbl_bank_master.active_flag=1';
        break;
      }
      default:
      {
        sql = sql_all;
        break; 
      }
    }





  db.query({sql:sql,timeout: MEDIUM_QUERY},function(err,rows,fields){
    console.log(sql);
    if(err && err.code ==="PROTOCOL_SEQUENCE_TIMEOUT")
    {
      logger.error('API from fetch AUction data');
      logger.error('TOO long to exicute query');
      logger.error(sql);
      logger.error(err);
      res.status(408);
      res.json({data: "retArr"});
      return true;
    }else if(err){
      logger.error('API from fetch Auction data');
      logger.error('Error in fetch data');
      error.errCode = 1;
      error.errMsg  = "Error in fetch Auction data";
      res.status(400);
      res.json(retArr);
      return true;
    }else if(rows)
    {
      if(Object.keys(rows).length)
        {
          retArr.result = rows[0];
          retArr.Msg    = "Successfully fetch data from auction ";
          res.status(200);
          res.json(rows);
          return true;
        }
    }
  })  
};


module.exports = {
  postAuction: postAuction,
  fetchAuction: fetchAuction
};






  // SELECT (CASE WHEN DATE_ADD(created_on,INTERVAL 3 HOUR )> now() AND (now()>created_on) THEN 'live' WHEN DATE_ADD(created_on,INTERVAL 3 HOUR )< now() THEN 'Upcoming' ELSE 2 END) AS type from tbl_auction
  // (CASE WHEN DATE_ADD(created_on,INTERVAL 3 HOUR )> now() AND (now()>created_on) THEN 'live' WHEN DATE_ADD(created_on,INTERVAL 3 HOUR )< now() THEN 'Upcoming' WHEN auction_type=2 THEN 'closed' WHEN auction_type=3 then 'cancled' ELSE 2 END) AS type

  // var sql             = 'Select \n\
  // bank_id as bank_id, \n\
  // emd_paying_page as emd, \n\
  // account_no as account_no, \n\
  // carat as carat, \n\
  // min_amount as min_amount, \n\
  // no_packet as no_packet, \n\
  // features_packet as featurs_packet,\n\
  // (CASE \n\
  //   WHEN DATE_ADD(created_on,INTERVAL 3 HOUR )> now() AND (now()>created_on) AND auction_type=1 THEN "live" \n\
  //   WHEN DATE_ADD(created_on,INTERVAL 3 HOUR )< now() AND auction_type=1 THEN "Upcoming"  \n\
  //   WHEN auction_type=2 THEN "closed" \n\
  //   WHEN auction_type=3 THEN "Canclled" \n\
  //   END \n\
  // ) as type from tbl_auction';