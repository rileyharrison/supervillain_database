var express = require("express");
var router = express.Router();
var path = require("path");
var Villains = require("../models/villains.js");
var jsforce  = require('jsforce');
var dotenv = require('dotenv').config();
var username = process.env.username;
var password = process.env.password;




// Username: info@stlf.net
//
//  Password: yeahbud1
//
//  Security Token: 3ntDrM8CbvXhDSS6o6a2JUgt





//  TODO
// var conn = new jsforce.Connection({
//   instanceUrl : '<your Salesforce server URL (e.g. https://na1.salesforce.com) is here>',
//   accessToken : '<your Salesforrce OAuth2 access token is here>'
// });
// router.get("/pull", function (req, res) {
//
//     console.log("in poull", req.instanceUrl);
//
//     //-----------
//    //  var conn = new jsforce.Connection({
//    //      instanceUrl : req.instanceUrl,
//    //      accessToken : req.accessToken
//    //  });
//    //
//    //
//    //
//    //
//    // conn.query("SELECT Id, Name FROM Account", function(err, result) {
//    //   if (err) { return console.error(err); }
//    //   console.log("total : " + result.totalSize);
//    //   console.log("fetched : " + result.records.length);
//    });
//   });
router.get("/pull", function (req, res) {

    console.log("In pull on the serve, and req.params=", req.query.instanceUrl, req.query.accessToken);
  var conn = new jsforce.Connection({
      instanceUrl : req.query.instanceUrl,
      accessToken : req.query.accessToken
  });

  console.log("Connected?");

  var query = "SELECT AccountId, Account.Name, RecordType.Name, Amount, CloseDate, Campaign.Name,";
  query += " Donation_SubCategory__c, FiscalYear,";
  query += " Account.npe01__One2OneContact__r.npo02__Household__r.Id, StageName FROM ";
  query += "Opportunity WHERE StageName ='Posted' LIMIT 20";

  // var query = 'SELECT id, name FROM account LIMIT 20';


  conn.query(query, function(err, result) {
      console.log("total : " + result.totalSize);
      console.log("fetched : " + result.records.length);
      res.status(200).send(result);

    });



});



router.get("/force", function (req, res) {
  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com'
  });
  // var username = 'info@stlf.net';
  // var password = 'yeahbud13ntDrM8CbvXhDSS6o6a2JUgt';
  var username = process.env.username;
  var password = process.env.password;

  console.log(" in index username = ", username);
  conn.login(username, password, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log("acces token", conn.accessToken);
    console.log("conn insrtance url",conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);

    // ...
    var creds = {};
    creds.accessToken = conn.accessToken;
    creds.instanceUrl = conn.instanceUrl;
    creds.userInfoId = userInfo.id;
    creds.userInfoOrganizationId = userInfo.organizationId;

    res.status(200).send(creds);

    // var query = 'SELECT id, name FROM account LIMIT 10';
    //
    //
    // conn.query(query, function(err, result) {
    //     console.log("total : " + result.totalSize);
    //     console.log("fetched : " + result.records.length);
    //     res.status(200).send(result);
    //
    //   });






    // res.send('JSForce Connect Successed!', creds);
  });


  //res.send('Hello World');
});




// copied in for Villains TODO remove Movie code above
router.get("/villain", function(req,res){
    Villains.find({}, function(err,data){
        if(err){
            console.log("error in index js get villain",err);
        }
        res.send(data);
    });
});

router.post("/villain", function(req,res){
    console.log("req body",req.body);
    var addedVillain = new Villains({"Name" : req.body.Name, "Power" : req.body.Power, "Foe" : req.body.Foe, "Weakness" : req.body.Weakness, "Image": req.body.Image});
    addedVillain.save(function(err, data){
        if(err){
            console.log("err saving Villain",err);
        }
        res.send(data);
    });
});

router.delete("/villain/:id", function(req,res){
    console.log("in app js for delete", req.params.id);
    Villains.remove({_id: req.params.id},function(err,data){
        if(err){
            console.log(err);
        }
        res.status(200).send();
    });
});

router.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;
