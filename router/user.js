const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const User = require('../model/user')
const uploadCloud = require('../config/cloud');
var nodemailer = require('nodemailer');
require('dotenv').config();
const removeAccents = require('remove-accents');
const mongoose = require('mongoose');


router.post('/checkuser',uploadCloud.none(), async(req,res) =>{
    const sdt = req.body.sdt
    const pas = req.body.password

   try {
    const Isuser = await User.findOne({sdt:sdt})

    // console.log(Isuser);
    if(Isuser){
        res.json({thongbao:false , loi:"sdt da duoc dang ki"})
    }else{
        res.json({thongbao:true});
    }
   } catch (error) {
    res.json({thongbao:false,loi:'co loi o server, vui long thu lai sau'})
   }
    
    
    
})
router.post('/dangki',uploadCloud.single('file'),async(req,res)=>{
    const avatar= req.file ? req.file.path : req.body.file;
   const salt = await bcrypt.genSalt(10);
   const password = await bcrypt.hash(req.body.password,salt)

   try {
    const newuser = new User({
        username:req.body.username,
        password:password,
        avatar:avatar,
        sdt:req.body.sdt,
        lat:req.body.lat,
        lon:req.body.lon,
    }) 
    const luu =await newuser.save();
    res.json({thongbao:true})
   } catch (error) {
        res.json({thongbao:false,loi:error.message})
   }
    
    
})
router.post('/login',uploadCloud.none(),async(req,res)=>{
    try {
        const user = await User.findOne({sdt:req.body.sdt});
        if(!user){
            res.json({thongbao:false,loi:"sdt chua dang ki"})
        }else{
            const password = await bcrypt.compare(req.body.password,user.password);
            if(password){
                if(req.body.lat && req.body.lon){
                    await User.updateOne(
                        {_id:user._id},
                        {$set:{lat:req.body.lat,lon:req.body.lon}}
                    );
                }
                res.json({thongbao:true,data:user})
            }else{
                res.json({thongbao:false,loi:'sai mat khau'})
            }
        }
    } catch (error) {
        res.status(500).json({ thongbao: false,loi:"Lỗi server" });
    }
    
})
router.get('/getalluser',async(req,res) =>{
    try {
        const alluser = await User.find()
        res.json({thongbao:true,data:alluser});
    } catch (error) {
        res.json({thongbao:false,loi:'loi server'})
    }
})
router.post('/updatelocation',uploadCloud.none(), async(req,res)=>{
    try {
        const update = await User.findByIdAndUpdate(
            
            req.body.id_user,
            {lat:req.body.lat,lon:req.body.lon},
            {new:true}
        );
        if(!update){
            res.status(404).json({thongbao:false,loi:'khong tim thay nguoi dung'})
        }
        return res.status(200).json({ thongbao:true});

    } catch (error) {
        return res.status(500).json({ thongbao: false, loi: error.message });
    }
})

module.exports = router;
