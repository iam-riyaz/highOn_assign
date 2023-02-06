const { default: mongoose } = require("mongoose");

const userSchema= new mongoose.Schema({
    name:{type:"string", required: true},
    email:{type:"string", required: true, unique:true},
    userid:{type:"string", required: true,unique:true},
    password:{type:"string", required: true},
    address:{type:"string",default:""},
    latitude:{type:"string",default:""},
    longitude:{type:"string",default:""},
    acType:{type:"string",default:"user"}
    
})

const User= mongoose.model("user",userSchema);

module.exports= User