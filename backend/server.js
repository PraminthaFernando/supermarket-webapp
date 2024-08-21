const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Dasun123",
    database: "stock_market"
}).promise()

app.get("/role", async (req, res) => {
    const result = await db.query("SELECT * FROM role")
    res.json(result[0])
})

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8000, ()=>{
    console.log("connected to backend!")
}) 

// test comment added
