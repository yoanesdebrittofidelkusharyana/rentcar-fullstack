import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Tambah Link
import './App.css'; // Atau './Login.css' jika Anda memisahnya

const Login = () => {
  const navigate = useNavigate();
  
  // State untuk input user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Kirim Email & Password ke Backend (Port 7144)
      const response = await fetch("https://localhost:7144/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        // 2. Jika Sukses (Status 200 OK)
        console.log("Login Sukses:", result);
        
        
        localStorage.setItem('user', result.userData.name || email);
        localStorage.setItem('user', result.userData.name); 
        localStorage.setItem('userEmail', result.userData.email);
        
        // Pindah ke Dashboard
        navigate('/dashboard');
      } else {
        // 3. Jika Gagal (Password salah / Email tidak ada)
        setError(result.message || "Email atau Password salah!");
      }

    } catch (err) {
      console.error("Error Login:", err);
      setError("Gagal terhubung ke Server. Pastikan Visual Studio jalan.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to RentCar 🚗</h2>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Your Email:</label>
            <input 
              type="email" 
              className="form-input"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Contoh: fidel@binus.ac.id"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Input Password:</label>
            <input 
              type="password" 
              className="form-input"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Masukkan password Anda"
              required 
            />
          </div>
          
          <button type="submit" className="btn-login">Login</button>
        </form>

        {/* Link menuju halaman Register */}
        <p style={{textAlign: 'center', marginTop: '15px', fontSize: '14px'}}>
          Belum punya akun? <Link to="/register" style={{color: '#0d6efd', fontWeight: 'bold'}}>Daftar disini</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;