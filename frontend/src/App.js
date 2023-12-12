import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/authentication/login";
import Registration from "./pages/authentication/registration"
import PageNotFound from "./pages/error/pageNotFound";
import ClientHome from "./pages/client/ClientHome"
import Account from "./pages/account/account";
import AdminHome from "./pages/admin/adminHome";
import StylistHome from "./pages/stylist/stylistHome";
import AccountEdit from "./pages/account/accountEdit";

import EditEmployee from "./components/adminHome/editEmployee";
import AddEmployee from "./components/adminHome/addEmployee";
import AddClient from "./components/adminHome/addClient";
import AddAccount from "./components/adminHome/Accounts/addAccount"
import EditInventory from "./components/adminHome/Inventory/editInventory"
import AddInventory from "./components/adminHome/Inventory/addInventory";

import AddInventoryStylist from "./components/stylistHome/Inventory/addInventoryStylist";
import EditInventoryStylist from "./components/stylistHome/Inventory/editInventoryStylist";

import AdminStylistHome from "./pages/adminstylist/adminStylistHome";
import AddEmployeeAS from "./components/adminStylistHome/Employee/addEmployeeAS";
import EditEmployeeAS from "./components/adminStylistHome/Employee/editEmployeeAS";
import AddClientAS from "./components/adminStylistHome/Client/addClientAS";
import AddAccountAS from "./components/adminStylistHome/Accounts/addAccountAS";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/> {/* This routes initially to the login page. For path / means first page write the others as you need*/}
            <Route path="/registration" element={<Registration/>}/>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/clientHome" element={<ClientHome/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/adminHome/*" element={<AdminHome/>}/>
            <Route path="/stylistHome/*" element={<StylistHome/>}/>
            <Route path="/accountEdit" element={<AccountEdit/>}/>

            <Route path="/adminHome/editEmployee/:id" element={<EditEmployee/>}/>
            <Route path="/adminHome/addEmployee" element={<AddEmployee/>}/>
            <Route path="/adminHome/addClient" element={<AddClient/>}/>
            <Route path="/adminHome/addAccount" element={<AddAccount/>}/>
            <Route path="/adminHome/editInventory/:id" element={<EditInventory/>}/>
            <Route path="/adminHome/addInventory" element={<AddInventory/>}/>

            <Route path="/stylistHome/editInventory/:id" element={<EditInventoryStylist/>}/>
            <Route path="/stylistHome/addInventory" element={<AddInventoryStylist/>}/>

            <Route path="/adminStylistHome/*" element={<AdminStylistHome/>}/>
            <Route path="/adminStylistHome/editEmployee/:id" element={<EditEmployeeAS/>}/>
            <Route path="/adminStylistHome/addEmployee" element={<AddEmployeeAS/>}/>
            <Route path="/adminStylistHome/addClient" element={<AddClientAS/>}/>
            <Route path="/adminStylistHome/addAccount" element={<AddAccountAS/>}/>

          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
