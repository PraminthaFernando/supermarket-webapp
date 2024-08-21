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

const allowedTables = ['places', 'users', 'vendors', "stock", "records", 'items', 'employees', 'customers', 'bills'];

app.put("/record/create", async (req, res) => {
    const payment = req.body.Payment
    const price = req.body.Price
    const des = req.body.description
    const date = req.body.Date
    const result = await db.query("INSERT INTO records(Payment, Date, Report_ID, Price, Description) VALUES (?,?,(SELECT `ID` FROM `reports` WHERE Year = year(now()) and Month = month(now())),?,?)", [payment,date,price,des])
    res.json("successfull...")
})

app.put("/customer/create", async (req, res) => {
    const values = [req.body.ID, req.body.Name, req.body.Contact, req.body.Join_Date]
    const result = await db.query("INSERT INTO customers (ID, Name, Contact_No, Join_date) VALUES (?)", [values])
    res.json("successfull...")
})

app.put("/employee/create", async (req, res) => {
    const values = [req.body.ID, req.body.Name, req.body.Contact, req.body.Address]
    const result = await db.query("INSERT INTO employees (ID, Name, Contact_No, Address) VALUES (?)", [values])
    res.json("successfull...")
})

app.get("/item/create", async (req, res) => {
    const values = [req.body.ID, req.body.Name]
    const result = await db.query("INSERT INTO items VALUES (?)", [values])
    res.json("successfull...")
})

// app.get("/places", async (req, res) => {
//     const result = await db.query("SELECT * FROM places")
//     res.json(result[0])
// })

// app.get("/items", async (req, res) => {
//     const result = await db.query("SELECT * FROM items")
//     res.json(result[0])
// })

// app.get("/employees", async (req, res) => {
//     const result = await db.query("SELECT * FROM employees")
//     res.json(result[0])
// })

app.get("/:Table", async (req, res) => {

    const table = req.params.Table

    if (!allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }

    const result = await db.query(`SELECT * FROM \`${table}\``)
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
