import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration"
import PageNotFound from "./pages/pageNotFound";
import ClientHome from "./pages/clientHome"
import Account from "./pages/account";
import AdminHome from "./pages/adminHome";
import StylistHome from "./pages/stylistHome";

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
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
