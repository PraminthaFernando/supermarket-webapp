const express = require("express")
const cookieParser = require('cookie-parser');
const db = require('./db');
const { loginUser, refreshUserLogin } = require('./userStore');
const { verifyToken, verifyRefreshToken, generateAccessToken } = require('./jwtUtils');
const cors = require("cors")
const mysql = require("mysql2")
const EventEmitter = require('events');
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator');

// const printer = require('printer');

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
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend's URL (React or other frontend)
    credentials: true, // This allows cookies to be sent/received with requests
}))
app.use(cookieParser());

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken; // Get token from Authorization header
    // console.log(token)
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        const user = verifyToken(token);
        req.user = user; // Attach user info to the request
        next();
    } catch (error) {
        // console.log(error)
        return res.sendStatus(403); // Forbidden
    }
};

// const authMiddleware = (req, res, next) => {
//     const accesshToken = req.cookies.accessToken;
//     const refreshToken = req.cookies.refreshToken; // Accessing refresh token from cookie

//     // If neither access token nor refresh token are found, return Unauthorized
//     if (!accesshToken && !refreshToken) {
//         return res.sendStatus(401); // Unauthorized
//     }

//     try {
//         if (token) {
//             // Verify access token
//             const user = verifyToken(token); 
//             if (!user) return res.sendStatus(403); // Forbidden if token invalid or expired
//             req.user = user; // Attach user info to the request
//             next();
//         } else if (refreshToken) {
//             // Verify refresh token
//             const user = verifyRefreshToken(refreshToken); 
//             if (!user) return res.sendStatus(403); // Forbidden if refresh token invalid

//             // Generate a new access token
//             const { accessToken } = generateAccessToken(user,res);
//             // Send the new access token to the client
//             res.setHeader('Authorization', `Bearer ${accessToken}`);
            
//             // Optionally, you can return the token in the response body if preferred
//             // res.json({ accessToken });

//             req.user = user; // Attach user info to the request
//             next();
//         }
//     } catch (error) {
//         return res.sendStatus(403); // Forbidden for other errors (token tampering, etc.)
//     }
// };

app.post('/login', async (req, res) => {
    const { username, password} = req.body;
    const refreshToken = req.cookies.refreshToken
    try {
        const result = await verifyRefreshToken(refreshToken, res)
        if (result) {
            const data = await loginUser(username, password, res);
            if (data) {
                return res.json( data.accessToken ); // Return the JWT
            } else {
                return res.status(401).send('Invalid credentials');
            }
        }
        return res.sendStatus(403);
    } catch (err) {
        console.log(err)
    }
        
});

app.post('/validate-refresh-token', async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.sendStatus(403)
    }
    try {
        const result = await verifyRefreshToken(token, res)
        if (result) {
            return res.sendStatus(200);
        }
        return res.sendStatus(403);
    } catch (err) {
        console.log(err)
        return res.sendStatus(403);
    }
});

app.post('/Refresh-login', async (req, res) => {
    const { username, password} = req.body;
    const { refreshToken } = await refreshUserLogin(username, password, res);
    if (refreshToken) {
        // res.setHeader('Authorization', `Bearer ${accessToken}`);
        return res.json({ refreshToken }); // Return the JWT
    } else {
        return res.status(401).send('Invalid credentials');
    }
});


app.use(authMiddleware);

const allowedTables = ['places', 'users', 'vendors', "stock", "records", 'items', 'employees', 'customers', 'bills', 'orders'];

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
    const values = [req.body.ID, req.body.Name, req.body.Contact, req.body.Address, req.body.date]
    const result = await db.query("INSERT INTO employees (ID, Name, Contact_No, Address, Join_date) VALUES (?)", [values])
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

app.put("/user/add", async (req, res) => {
    const data = [
        req.body.username,
        req.body.Name,
        req.body.contact,
        req.body.address,
        req.body.joinDate]
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds
    await db.query("INSERT INTO users(username ,Name, Contact_No, Address, Join_Date, User_Password) VALUES(?,?)", [data, hashedPassword])
})

app.post("/vendor/add", async (req, res) => {
    const existingUser = await db.query('SELECT * FROM vendors WHERE ID = ?', [req.body.ID]);
    if (existingUser[0].length > 0) {
        return res.json({ message: "විකුණුම්කරු හැඳුනුම්පත දැනටමත් පවතී." });
    }
    const data = [req.body.ID, req.body.fullName, req.body.contact, req.body.role, req.body.place]
    await db.query("INSERT INTO vendors VALUES(?)", [data])
    res.json({ message: "" })
})

app.put("/bill/create", async (req, res) => {
    const data = [req.body.date, req.body.customerID]
    const [result] = await db.query("INSERT INTO bills (Date, Customer_ID, Report_ID) VALUES(?, (SELECT ID FROM reports WHERE Year = YEAR(NOW()) AND Month = MONTH(NOW())))", [data])
    res.json(result.insertId)
})

app.put("/order/create", async (req, res) => {
    const date = req.body.date
    const bill = req.body.bill
    const [result] = await db.query("INSERT INTO orders (Open_Date, Status, Bill_ID) VALUES(?,?,?)", [date, 'incomplete',bill])
    res.json(result.insertId)
})

app.put("/dealings/add", async (req, res) => {
    const data = [req.body.billID, req.body.item, req.body.place, req.body.quantity]
    await db.query(`START TRANSACTION`);
    const [id] = await db.query("INSERT INTO dealings (Bill_ID, Item_ID, Place_ID, Quantity) VALUES(?)", [data])
    const [result] = await db.query("SELECT Unit_Price, ID FROM stock WHERE Item_ID = ? and Place_ID = ?", [req.body.item, req.body.place])
    await db.query("UPDATE dealings SET Stock_ID = ? WHERE ID = ?", [result[0].ID, id.insertId])
    await db.query(`COMMIT`);
    res.json([result[0],id.insertId])
})

app.post("/customer/update", async (req, res) => {
    const id = req.body.oldId
    const newId = req.body.newId
    const name = req.body.Name
    const contact = req.body.contact
    const date = req.body.date
    try {
    if (name !== "") {
        await db.query("UPDATE customers SET Name = ? WHERE (ID = ?)", [name, id]);
    }
    if (contact !== "") {
        await db.query("UPDATE customers SET Contact_No = ? WHERE (ID = ?)", [contact, id]);
    }
    if (date !== "") {
        await db.query("UPDATE customers SET Join_Date = ? WHERE (ID = ?)", [date, id]);
    }
    if (newId !== "") {
        await db.query("UPDATE customers SET ID = ? WHERE (ID = ?)", [newId, id]);
    }
    res.json("ok")
    }
    catch (err) {
        res.json("පාරිභෝගික හැඳුනුම්පත වෙනස් කළ නොහැක")
    }
})

app.post("/employee/update", async (req, res) => {
    const id = req.body.oldId
    const newId = req.body.newId
    const name = req.body.Name
    const contact = req.body.contact
    const date = req.body.date
    const address = req.body.address
    if (name !== "") {
        await db.query("UPDATE employees SET Name = ? WHERE (ID = ?)", [name, id]);
    }
    if (contact !== "") {
        await db.query("UPDATE employees SET Contact_No = ? WHERE (ID = ?)", [contact, id]);
    }
    if (date !== "") {
        await db.query("UPDATE employees SET Join_Date = ? WHERE (ID = ?)", [date, id]);
    }
    if (address !== "") {
        await db.query("UPDATE employees SET Address = ? WHERE (ID = ?)", [address, id]);
    }
    if (newId !== "") {
        await db.query("UPDATE employees SET ID = ? WHERE (ID = ?)", [newId, id]);
    }
    res.json("ok")
})

app.post("/user/update", async (req, res) => {
    const id = req.body.oldId
    const firstName = req.body.new.firstName
    const lastName = req.body.new.lastName
    const contact = req.body.new.contact
    const address = req.body.address
    const password = req.body.new.password
    const confirmPassword = req.body.new.confirmPassword
    const date = req.body.new.date

    if (password === confirmPassword) {
        if (address !== "") {
            await db.query("UPDATE users SET Address = ? WHERE (ID = ?)", [address, id]);
        }
        if (firstName !== "") {
            await db.query("UPDATE users SET Name = ? WHERE (ID = ?)", [firstName, id]);
        }
        if (contact !== "") {
            await db.query("UPDATE users SET Contact_No = ? WHERE (ID = ?)", [contact, id]);
        }
        if (date !== "") {
            await db.query("UPDATE users SET Join_Date = ? WHERE (ID = ?)", [date, id]);
        }
        if (password !== "") {
            await db.query("UPDATE users SET User_Password = ? WHERE (ID = ?)", [password, id]);
        }
        return res.json("ok")
    }
    else {
        return res.json("මුරපදය නොගැලපේ")
    }
})

app.post("/record/update", async (req, res) => {
    const id = req.body.id
    const payment = req.body.payment
    const price = req.body.price
    const description = req.body.description
    if (payment !== "") {
        await db.query("UPDATE records SET Payment = ? WHERE (ID = ?)", [payment, id]);
    }
    if (price !== "") {
        await db.query("UPDATE records SET Price = ? WHERE (ID = ?)", [price, id]);
    }
    if (description !== "") {
        await db.query("UPDATE records SET Description = ? WHERE (ID = ?)", [description, id]);
    }
    res.json("ok")
})

app.post("/stock/update", async (req, res) => {
    const id = req.body.id
    const vendorID = req.body.data.vendorID
    const item = req.body.data.item
    const place = req.body.data.place
    const unitPrice = req.body.data.unitPrice
    const quantity = req.body.data.quantity
    if (vendorID !== "") {
        await db.query("UPDATE stock SET Vendor_ID = ? WHERE (ID = ?)", [vendorID, id]);
    }
    if (item !== "") {
        await db.query("UPDATE stock SET Item_ID = ? WHERE (ID = ?)", [item, id]);
    }
    if (place !== "") {
        await db.query("UPDATE stock SET Place_ID = ? WHERE (ID = ?)", [place, id]);
    }
    if (unitPrice !== "") {
        await db.query("UPDATE stock SET Unit_Price = ? WHERE (ID = ?)", [unitPrice, id]);
    }
    if (quantity !== "") {
        await db.query("UPDATE stock SET Quantity = ? WHERE (ID = ?)", [quantity, id]);
    }
    const [result] = await db.query("SELECT Record_ID, Unit_Price, Quantity FROM stock WHERE ID = ?", [id])
    console.log(result[0])
    const { Record_ID, Unit_Price, Quantity } = result[0];
    await db.query("UPDATE records SET Price = ? WHERE ID = ?", [(Unit_Price * Quantity), Record_ID])
    res.json("ok")
})

app.post("/vendor/update", async (req, res) => {
    const id = req.body.oldId
    const vendorID = req.body.newId
    const Name = req.body.Name
    const contact = req.body.contact
    const role = req.body.role
    const place = req.body.place
    if (Name !== "") {
        await db.query("UPDATE vendors SET Name = ? WHERE (ID = ?)", [Name, id]);
    }
    if (contact !== "") {
        await db.query("UPDATE vendors SET Contact_No = ? WHERE (ID = ?)", [contact, id]);
    }
    if (role !== "") {
        await db.query("UPDATE vendors SET Role = ? WHERE (ID = ?)", [role, id]);
    }
    if (place !== "") {
        await db.query("UPDATE vendors SET Place_ID = ? WHERE (ID = ?)", [place, id]);
    }
    if (vendorID !== "") {
        await db.query("UPDATE vendors SET ID = ? WHERE (ID = ?)", [vendorID, id]);
    }
    res.json("ok")
})

app.post("/bill/update", async (req, res) => {
    const id = req.body.id
    const status = req.body.status
    const Total = req.body.Total
    db.query(`START TRANSACTION`)
    if (status !== "") {
        await db.query("UPDATE bills SET Status = ? WHERE ID = ?", [status, id]);
    }    
    if (Total !== 0) {
        await db.query("UPDATE bills SET Total_Price = ? WHERE ID = ?", [Total, id])
    }
    // await db.query("UPDATE bills SET Status = ?, Total_Price = ? WHERE ID = ?", [status, Total, id])
    db.query("COMMIT")
    res.json("ok")
})

app.post("/order/update", async (req, res) => {
    const id = req.body.id
    const status = req.body.status
    const close = req.body.closedate
    db.query(`START TRANSACTION`)
    if (status !== "") {
        await db.query("UPDATE orders SET Status = ? WHERE Bill_ID = ?", [status, id]);
    }    
    if (close !== "") {
        await db.query("UPDATE orders SET Close_Date = ? WHERE Bill_ID = ?", [close, id])
    }
    // await db.query("UPDATE bills SET Status = ?, Total_Price = ? WHERE ID = ?", [status, Total, id])
    db.query("COMMIT")
    res.json("ok")
})

app.delete("/order/remove", async (req, res) => {
    try {
    const table = req.params.Table
    const id = req.query.id
    await db.query(`DELETE FROM orders WHERE Bill_ID = ?`, [id])
    } catch (err) {
        console.log(err)
        return res.json("ගිණුම ඉවත් කළ නොහැක")
    }
    res.json("ok")
})

app.delete("/:Table/delete", async (req, res) => {
    try {
    const table = req.params.Table
    const id = req.query.id
    await db.query(`DELETE FROM \`${table}\` WHERE ID = ?`, [id])
    } catch (err) {
        console.log(err)
        return res.json("ගිණුම ඉවත් කළ නොහැක")
    }
    res.json("ok")
})

// app.post('/bill/print', (req, res) => {
//     const { items, total } = req.body;
  
//     let printContent = 'POS Bill\n\n';
//     items.forEach(item => {
//       printContent += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
//     });
//     printContent += `\nTotal: $${total.toFixed(2)}\n`;
  
//     // Send to printer
//     printer.printDirect({
//       data: printContent,
//       type: 'RAW', // or 'TEXT' based on your printer
//       success: function (jobID) {
//         console.log(`Printed with job ID: ${jobID}`);
//         res.send({ message: 'Printed successfully!' });
//       },
//       error: function (err) {
//         console.error(err);
//         res.status(500).send({ error: 'Failed to print.' });
//       }
//     });
//   });

app.get("/stock/items", async (req, res) => {
    const data = await db.query("SELECT DISTINCT Item_ID FROM stock" )
    res.json(data[0])
})

app.get("/CustomerOrders/items", async (req, res) => {
    const billId = req.query.id
    const data = await db.query("SELECT * FROM CustomerOrders WHERE Bill_ID = ?", [billId])
    res.json(data[0])
})

app.get("/stock/places", async (req, res) => {
    const item = req.query.Item;
    const data = await db.query("SELECT distinct Place_ID FROM stock WHERE Item_ID = ? AND Quantity > 0", [item] )
    res.json(data[0])
})

app.get("/stocks/get", async (req, res) => {
    const item = req.query.Item;
    const place = req.query.Place
    const [data] = await db.query("SELECT Quantity FROM stock WHERE Item_ID = ? and Place_ID = ?", [item, place] )
    res.json(data[0])
})

app.get("/:Table", async (req, res) => {
    const table = req.params.Table

    if (!allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }

    const result = await db.query(`SELECT * FROM \`${table}\``)
    res.json(result[0])
})

app.use((err, req, res, next) => {
    if (err instanceof DatabaseError) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error occurred" });
    }
    next(err);
  });

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
