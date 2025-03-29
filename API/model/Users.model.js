const mongoose = require("mongoose");
const User = mongoose.Schema({
    firstname:{
        type:String,
        required: true,
        min: 3,
        max: 20
    },
    lastname:{
        type:String,
        required: true,
        min: 3,
        max: 20
    },
    email:{
        type:String,
        required: true,
        max: 50,
        unique: true
    },
    password:{
        type:String,
        required: true,
        min: 6
    },
    country:{
        type:String,
        required:true,
        min:3
    },
    province:{
        type:String,
        required:true,
        min:3
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    agreeToTerms:{
        type:Boolean,
        required: false
    }
},{timestamps: true}
);


module.exports = mongoose.model("User",User);

