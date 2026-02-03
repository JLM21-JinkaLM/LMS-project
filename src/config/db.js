const mongoose = require('mongoose')

// module.exports = async()=>{ 
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log("database Connected")
// }

const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("database Connected")
    }
    catch(error){
        console.log('unable to connect ')
        console.log('error',error)
        process.exit(1);
    }
}

module.exports = connectToDb;