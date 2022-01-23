const express = require('express');
const router=express.Router();
const { check, validationResult } = require('express-validator');
const User=require("../models/User");
const auth=require("../middleware/auth");
const Contact=require("../models/Contact");

router.get("/",auth, async function(req,res){
    try{
        const contacts=await Contact.find({user: req.user.id}).sort({date:-1});
        res.json(contacts);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", [auth,[
    check("name", "Name is required").notEmpty()
]], async function(req,res){
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name,email,phone,type}=req.body;
    try{
        const newContact=new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });
        const contact=await newContact.save();
        res.json(contact);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.put("/:id",auth, async function(req,res){
    //res.send("Update contact");
    const { name, email, phone, type } = req.body;

    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });
        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        );
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete("/:id",auth, async function(req,res){
    //res.send("Delete Contact");
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });
        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Not authorized' });
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Contact removed' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

module.exports = router;