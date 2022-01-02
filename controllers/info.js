const express = require('express');


exports.getinfo = async( req, res, next)=>{
    //   console.log(req.session);
      res.render('info/info',{
     data : req.session.data.teachers,
 })
}