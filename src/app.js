require("dotenv").config()
const express = require("express")
const app = express()
const authRouter = require("./route/auth.route")

app.use(express.json())
app.use("/api/user/",authRouter)

module.exports = app