const mongoose = require('mongoose')
mongoose.set('strictQuery', true);



  const  connectDb= async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDb is connected")
    }
    catch(err){
   console.log(err);
   process.exit()
    }
}

module.exports= connectDb
