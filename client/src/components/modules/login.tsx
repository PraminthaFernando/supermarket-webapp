import React, { useState } from "react";
import "../styleAssets/login.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUN = (data: string) => {
    setUsername(data);
    setError("");
  };
  const handlePW = (data: string) => {
    setPassword(data);
    setError("");
  };

  const handleClick = () => {
    if (username === "" && password === "") {
      return;
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (username === "B80") {
      if (password === "1234") {
        navigate("/UserDashboard");
      } else {
        setPassword("");
        navigate("/");
        setError("Incorrect Password");
      }
    } else {
      setUsername("");
      setPassword("");
      navigate("/");
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="login-box">
      <h1>login</h1>
      <line className="loginerror">{error}</line>
      <form onSubmit={handleClick}>
        <div className="input-box">
          <line className="label">Username: </line>
          <input
            value={username} // onSubmit={handleSubmit}
            className="box"
            type="username"
            onChange={(e) => handleUN(e.target.value)} //handleUN(e.target.value)
            autoFocus
            required
          ></input>
        </div>
        <div className="input-box">
          <line className="labal">Password: </line>
          <input
            value={password}
            className="box"
            type="password"
            onChange={(e) => handlePW(e.target.value)}
            required
          ></input>
        </div>
        {/* <button hidden></button> */}
      </form>
      <button onClick={handleSubmit} className="btn">
        confirm
      </button>
    </div>
  );
};

export default Login;
