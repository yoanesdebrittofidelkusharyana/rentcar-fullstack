import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import RentCar from './RentCar';
import History from './History'; // Import halaman History

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route path="/" element={<Login />} />
        
        {/* Halaman Register */}
        <Route path="/register" element={<Register />} />
        
        {/* Halaman Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Halaman Konfirmasi Sewa */}
        <Route path="/rent-confirm" element={<RentCar />} />

        {/* Halaman Riwayat (BARU) */}
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;