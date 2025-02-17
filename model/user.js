const mongoose = require(`mongoose`);

const Userschema = new mongoose.Schema({
    sdt:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

    avatar:{
        type:String,
        required:true,
    },
    lat:{
        type:Number,
        // required:false,
    },
    lon:{
        type:Number,
        
    }
},{timestamps:true});

const User = mongoose.model('user',Userschema,"user");

module.exports = User;