import React, { useState } from "react";
import "../styleAssets/Addvendors.css";

const Addvendors: React.FC = () => {
  const [VendorID, setVendorID] = useState("");
  const [name, setName] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Role, setRole] = useState("");
  const [Place, setPlace] = useState("");

  return (
    <div className="form-box">
      <h1>Add vendors</h1>
      <form>
        <div className="input-box">
          <line className="label">Short name: </line>
          <input
            placeholder="enter vendor ID"
            value={VendorID}
            className="box"
            type="text"
            onChange={(e) => setVendorID(e.target.value)}
            autoFocus
            required
          ></input>
        </div>
        <div className="input-box">
          <line className="labal">Name of vender: </line>
          <input
            placeholder="enter vendor's name"
            value={name}
            className="box"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div className="input-box-select">
          <select
            className="selectbox"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value={""}>select vendor role:</option>
            <option value={"Farmer"}>Farmer</option>
            <option value={"Lorry"}>Lorry</option>
          </select>
          <select
            className="selectbox"
            onChange={(e) => setPlace(e.target.value)}
            required
          >
            <option value={""}>select place:</option>
          </select>
        </div>
        <div className="input-box">
          <line className="labal">Contact No: </line>
          <input
            placeholder="enter vendor mobile number"
            value={ContactNo}
            className="box"
            type="tel"
            onChange={(e) => setContactNo(e.target.value)}
            required
          ></input>
        </div>
        <button className="btn">confirm</button>
      </form>
    </div>
  );
};

export default Addvendors;
