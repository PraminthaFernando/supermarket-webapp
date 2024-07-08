import React, { useState } from "react";

const AddEployees = () => {
  const [CustomerID, setCustomerID] = useState("");
  const [name, setName] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Address, setAddress] = useState("");

  return (
    <div className="form-box">
      <h1>Add Employees</h1>
      <form>
        <div className="input-box">
          <line className="label">Short name: </line>
          <input
            placeholder="enter employee ID"
            value={CustomerID}
            className="box"
            type="text"
            onChange={(e) => setCustomerID(e.target.value)}
            autoFocus
            required
          ></input>
        </div>
        <div className="input-box">
          <line className="labal">Name of Employee: </line>
          <input
            placeholder="enter employee name"
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
            placeholder="enter employee mobile number"
            value={ContactNo}
            className="box"
            type="tel"
            onChange={(e) => setContactNo(e.target.value)}
            required
          ></input>
        </div>
        <div className="input-box">
          <line className="labal">Address: </line>
          <input
            value={Address}
            placeholder="enter employee address"
            className="box"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <button className="btn">confirm</button>
      </form>
    </div>
  );
};

export default AddEployees;
