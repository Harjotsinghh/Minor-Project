const express = require('express');
const User = require('../models/user');
const College = require('../models/college');
const bcrypt = require('bcryptjs');

exports.getlogin = async (req, res, next)=>{
    if(req.session.isAuthenticated)
    return res.redirect('/info');
    
    res.render('auth/login',{
        error:"",
    })
}
exports.getsignup = async (req, res, next)=>{

    res.render('auth/signup',{
        isAuthenticated : req.session.isAuthenticated,
        user : req.session.user,
        error:""
    })
}

exports.postlogin = async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    try{
    const finduser = await User.findOne({email:email}).populate('collegeid');
    // console.log(finduser);
    if(!finduser){
        return res.render('auth/login',{
            error : "email not found please Sign Up!!"
        })
    }

    const correct = await bcrypt.compare(password,finduser.password);
    if(!correct){
        return res.render('auth/login',{
            error : "Please enter correct password",
        })
    }
   
    
    // console.log(finduser);
    req.session.isAuthenticated=true;
    req.session.data= finduser.collegeid;
    // console.log(req.session.data)
    const savesession = await req.session.save();

    return res.redirect('/info');
}
catch(err){
    console.log(err);
    res.redirect('/')
}
}
exports.postsignup = async(req, res, next) =>{  
    const name = req.body.name;
    const email = req.body.email;
    const institute = req.body.institute;
    const password = req.body.password;
    const confirmp = req.body.confirmPassword;

    if(password !== confirmp){
        return res.redirect('/signup',{
            error : 'password does not match',
        });

    }
    const userdoc = await User.findOne({email:email});
    if(userdoc){
        return res.redirect('/signup',{
            error: 'email already taken'
        });
    }
    const id = await College.findOne({name : institute})._id;
    try{
        const hashedpass= await bcrypt.hash(password,12);
        const user  = new User({
            name:name,
            email:email,
            password:password,
            college:institute,
            collegeid: id
        });
        const saveduser = await user.save();
        res.render('auth/login');
    }
    catch(err){
        console.log(err);
        return res.redirect('/signup')
    }


  
}

exports.getlogout = (req,res,next)=>{
    req.session.destroy();
    // console.log("after logout:  "+req.session)
    res.redirect('/');
}