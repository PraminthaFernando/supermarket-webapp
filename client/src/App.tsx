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
import REusers from "components/modules/REusers";
import REvendors from "components/modules/REvendors";
import ViewCustomers from "components/modules/ViewCustomers";
import ViewEmployee from "components/modules/ViewEmployee";
import ViewItems from "components/modules/ViewItems";
import ViewStock from "components/modules/ViewStock";
import ViewUsers from "components/modules/ViewUsers";
import ViewVendors from "components/modules/ViewVendors";
import ViewPlaces from "components/modules/ViewPlaces";
import AdminLogin from "components/modules/AdminLogin";
import ViewOrders from "components/modules/ViewOrders";
import ViewBills from "components/modules/ViewBills";
// import BillBoard from "components/Dashboard/BillBoard";
import ViewRecords from "components/modules/ViewRecords";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logOutUser, 3000000); // 1 hour
    };

    const logOutUser = () => {
      localStorage.removeItem("token");
      window.location.href = "/"; // Redirect to login
    };

    // Set up event listeners
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer; // Use onkeydown instead of onkeypress

    return () => {
      clearTimeout(inactivityTimer); // Clean up on component unmount
      document.onmousemove = null;
      document.onkeydown = null; // Clean up event listeners
    };
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/adminLogin" element={<AdminLogin />}></Route>
          <Route path="/Home" element={<UserDashboard />}></Route>
          <Route path="/UserDashboard" element={<UserDashboard />}></Route>
          <Route path="/CreateRecord" element={<CreateRecord />}></Route>
          <Route path="/AddItem" element={<AddItem />}></Route>
          <Route path="/items" element={<Items />}></Route>
          <Route path="/:Type/items/:billID" element={<Items />}></Route>
          <Route path="/ViewBills" element={<ViewBills />}></Route>
          <Route path="/CreateBills" element={<CreateBill />}></Route>
          <Route path="/ViewCustomers" element={<ViewCustomers />}></Route>
          <Route path="/Addcustomer" element={<Addcustomer />}></Route>
          <Route path="/REcustomer" element={<REcustomer />}></Route>
          <Route path="/ViewEmployee" element={<ViewEmployee />}></Route>
          <Route path="/AddEmployee" element={<AddEployees />}></Route>
          <Route path="/REemployee" element={<REemployee />}></Route>
          <Route path="/ViewItems" element={<ViewItems />}></Route>
          <Route path="/Additem" element={<AddItem />}></Route>
          <Route path="/ViewPlaces" element={<ViewPlaces />}></Route>
          <Route path="/ViewVendors" element={<ViewVendors />}></Route>
          <Route path="/Addvendors" element={<Addvendors />}></Route>
          <Route path="/REvendors" element={<REvendors />}></Route>
          {/* <Route path="/CreateOrder" element={<CreateOrder isOpen={true}  />}></Route> */}
          <Route path="/ViewOrders" element={<ViewOrders />}></Route>
          <Route path="/CreateRecord" element={<CreateRecord />}></Route>
          <Route path="/ViewRecords" element={<ViewRecords />}></Route>
          <Route path="/ViewStock" element={<ViewStock />}></Route>
          <Route path="/AddStock" element={<AddtoStock />}></Route>
          <Route path="/ViewUsers" element={<ViewUsers />}></Route>
          <Route path="/Addusers" element={<Addusers />}></Route>
          <Route path="/REusers" element={<REusers />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
