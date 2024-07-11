import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/modules/login";
import UserDashboard from "components/Dashboard/UserDashboard";
import AddItem from "components/modules/AddItem";
import Addcustomer from "components/modules/Addcustomer";
import Addvendors from "components/modules/Addvendors";
import AddEployees from "components/modules/AddEployees";
import AddtoStock from "components/modules/AddtoStock";
import Addusers from "components/modules/Addusers";
import CreateBill from "components/modules/CreateBill";
import Items from "components/modules/Items";
import CreateRecord from "components/modules/CreateRecord";
import REcustomer from "components/modules/REcustomer";
import REemployee from "components/modules/REemployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Home" element={<UserDashboard />}></Route>
          <Route path="/UserDashboard" element={<REcustomer />}></Route>
          <Route path="/CreateRecord" element={<CreateRecord />}></Route>
          <Route path="/AddItem" element={<AddItem />}></Route>
          <Route path="/items" element={<Items />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
