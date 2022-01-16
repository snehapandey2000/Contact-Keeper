const express = require('express');
const router=express.Router();

router.get("/", function(req,res){
    res.send("Contact List");
});

router.post("/", function(req,res){
    res.send("Add contact");
})

router.put("/:id", function(req,res){
    res.send("Update contact");
})

router.delete("/:id", function(req,res){
    res.send("Delete Contact");
})

module.exports = router;