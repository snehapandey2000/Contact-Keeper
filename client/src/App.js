import {React, Fragment} from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";

function App() {
  return (
    <AuthState>
      <ContactState>
      <Router>
      <Fragment>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/register" element={<Register/>}/>
          </Routes>
        </div>
      </Fragment>
      </Router>
      </ContactState>
    </AuthState>
  );
}

export default App;
