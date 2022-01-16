const express = require('express');
const router=express.Router();
const btcrypt=require("bcryptjs");
const config=require("config");
const { check, validationResult } = require('express-validator');
const User=require("../models/User");
const jwt=require("jsonwebtoken");

router.post("/",[
    check("name", "Please add your name").not.isEmpty(),
    check("email", "Please add valid email address").isEmail(),
    check("password", "Please enter a passowrd with 6 or more characters")
    .isLength({
        min:6
    })
],
 async function(req,res){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password}=req.body;
    try{
        let user=await User.findOne({email: email});
        if(user){
            return res.status(400).json({msg:"User already exists"});
        }
        user= new User({
            name,
            email,
            password
        });
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password, salt);
        await user.save();

        const payload={
            user:{
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
                expiresIn: 360000
            },
            function(err,token){
                if(err) throw err;
                res.json({token});
            }
        );
        
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    //res.send("Users");
});

module.exports = router;