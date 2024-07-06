import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/modules/login";
import UserDashboard from "components/Dashboard/UserDashboard";
import AddItem from "components/modules/AddItem";
import Addcustomer from "components/modules/Addcustomer";
import Addvendors from "components/modules/Addvendors";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Home" element={<UserDashboard />}></Route>
          <Route path="/UserDashboard" element={<Addvendors />}></Route>
          <Route path="/AddItem" element={<AddItem />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
