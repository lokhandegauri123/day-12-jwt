const mongoose = require("mongoose")
const dns = require("dns")

dns.setServers(["8.8.8.8"],["1.1.1.1"])
function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database connected")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB