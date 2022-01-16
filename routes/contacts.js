const express = require('express');
const router=express.Router();

router.get("/", function(req,res){
    res.send("Contact List");
});

router.post("/", function(req,res){
    res.send("add contact");
})

router.put("/:id", function(req,res){
    res.send("update contact");
})

router.delete("/:id", function(req,res){
    res.send("Delete Contact");
})

module.exports = router;