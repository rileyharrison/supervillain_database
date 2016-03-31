var express = require("express");
var router = express.Router();
var path = require("path");
var Villains = require("../models/villains.js");




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

router.delete("/villains/:id", function(req,res){
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
