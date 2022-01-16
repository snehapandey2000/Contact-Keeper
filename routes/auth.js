const express = require('express');
const router=express.Router();

router.get("/", function(req,res){
    res.send("Get Logged in user");
});

router.post("/", function(req,res){
    res.send("Log in User");
});
module.exports = router;