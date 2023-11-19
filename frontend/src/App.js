import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/authentication/login";
import Registration from "./pages/authentication/registration"
import PageNotFound from "./pages/error/pageNotFound";
import ClientHome from "./pages/client/ClientHome"
import Account from "./pages/account/account";
import AdminHome from "./pages/admin/adminHome";
import StylistHome from "./pages/stylist/stylistHome";
import AccountEdit from "./pages/account/accountEdit";

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
            <Route path="/adminHome" element={<AdminHome/>}/>
            <Route path="/stylistHome" element={<StylistHome/>}/>
            <Route path="/accountEdit" element={<AccountEdit/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
