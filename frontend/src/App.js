import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration"
import PageNotFound from "./pages/pageNotFound";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/> {/* This routes initially to the login page. For path / means first page write the others as you need*/}
            <Route path="/registration" element={<Registration/>}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
