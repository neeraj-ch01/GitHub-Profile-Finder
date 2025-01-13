import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup'; // Adjust the path if needed
import Login from './components/Login';   // Adjust the path if needed
import NavbarPage from './components/Navbar';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NavbarPage/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


