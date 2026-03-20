const mongoose = require("mongoose")
const dns = require("dns")

function connectToDb(){
    // Some networks use DNS servers that do not support SRV lookups (required for mongodb+srv URIs).
    // Override DNS servers to a public resolver that supports SRV (e.g., Google / Cloudflare).
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db")
    })
    .catch((err)=>{
        console.log(err);
    })

}

module.exports = connectToDb