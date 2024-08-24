const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
const EventEmitter = require('events');

const bus = new EventEmitter();

bus.setMaxListeners(20); // Increase the limit

// Example listener
const handleExit = () => {
    console.log('Exit event triggered');
};

// Add the listener
bus.on('exit', handleExit);

// Clean up the listener if needed
const cleanupListeners = () => {
    bus.off('exit', handleExit); // Remove the listener when no longer needed
};

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

app.put("/item/create", async (req, res) => {
    const values = [req.body.ID, req.body.Name]
    const result = await db.query("INSERT INTO items VALUES (?)", [values])
    res.json("successfull...")
})

app.put("/stock/add", async (req, res) => {
    console.log(req.body)
    const total = req.body.Quantity*req.body.UnitPrice
    const values = [req.body.Item_ID, req.body.Place_ID, parseFloat(req.body.UnitPrice).toFixed(2), req.body.Quantity, req.body.vendor_ID]
    await db.query(`START TRANSACTION`);

    const [recordResult] = await db.query(
        `INSERT INTO records (Payment, Date, Report_ID, Price, Description) 
            VALUES (?, NOW(), (SELECT ID FROM reports WHERE Year = YEAR(NOW()) AND Month = MONTH(NOW())), ?, ?)`,
        ["Stock", total, req.body.Item_ID]
    );

    const recordId = recordResult.insertId;

    await db.query(
        `INSERT INTO stock (Item_ID, Place_ID, Unit_Price, Quantity, Vendor_ID, Record_ID) 
            VALUES (?, ?, ?, ?, ?, ?)`,
        [...values, recordId]
    );

    await db.query(`COMMIT`);
    res.json("successfull...")
})

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

process.on('exit', () => {
    bus.emit('exit'); // Emit the exit event when the process exits
    cleanupListeners(); // Clean up listeners if necessary
});

app.listen(8000, ()=>{
    console.log("connected to backend!")
}) 

// test comment added
