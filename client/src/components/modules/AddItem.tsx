import React, { useState } from "react";
import "../styleAssets/AddItem.css";

function AddItem() {
  const [SN, setSN] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="form-box">
      <h1>Add vegitables</h1>
      <form>
        <div className="input-box">
          <line className="label">Short name: </line>
          <input
            value={SN}
            className="box"
            type="text"
            onChange={(e) => setSN(e.target.value)} //handleUN(e.target.value)
            autoFocus
            required
          ></input>
        </div>
        <div className="input-box">
          <line className="labal">Name of the kind: </line>
          <input
            value={name}
            className="box"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <button className="btn">confirm</button>
      </form>
    </div>
  );
}

export default AddItem;
