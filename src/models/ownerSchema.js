const { default: mongoose } = require("mongoose");

const ownerSchema= new mongoose.Schema({
    name:{type:"string", required: true},
    email:{type:"string", required: true, unique:true},
    userid:{type:"string", required: true,unique:true},
    password:{type:"string", required: true},
    acType:{type:"string",default:"owner"},
    list:{data:[{name:{type:"string"},address:{type:"string"},timedate:{type:"string"}}]}
})

const Owner= mongoose.model("owner",ownerSchema);

module.exports= Owner