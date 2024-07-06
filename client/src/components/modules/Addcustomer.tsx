import React, { useState } from "react";

function Addcustomer() {
  const [CustomerID, setCustomerID] = useState("");
  const [name, setName] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Joindate, setJoindate] = useState("");

  return (
    <div className="form-box">
      <h1>Add customers</h1>
      <form>
        <div className="input-box">
          <line className="label">Short name: </line>
          <input
            placeholder="enter customer ID"
            value={CustomerID}
            className="box"
            type="text"
            onChange={(e) => setCustomerID(e.target.value)}
            autoFocus
            required
          ></input>
        </div>
        <div className="input-box">
          <line className="labal">Name of customer: </line>
          <input
            placeholder="enter customer's name"
            value={name}
            className="box"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div className="input-box">
          <line className="labal">Contact No: </line>
          <input
            placeholder="enter customer mobile number"
            value={ContactNo}
            className="box"
            type="tel"
            onChange={(e) => setContactNo(e.target.value)}
            required
          ></input>
        </div>
        <div className="input-box">
          <line className="labal">Join date: </line>
          <input
            value={Joindate}
            defaultValue={Date.now()}
            className="box"
            type="date"
            onChange={(e) => setJoindate(e.target.value)}
            required
          ></input>
        </div>
        <button className="btn">confirm</button>
      </form>
    </div>
  );
}

export default Addcustomer;
