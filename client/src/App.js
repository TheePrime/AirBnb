import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import ListingDetails from './pages/ListingDetails';
import Navbar from './components/Navbar';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
      <Route element={<Navbar/>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateListing />} />
        
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/listings/edit/:id" element={<UpdateListing />} />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
