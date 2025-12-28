import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  // State untuk menyimpan data inputan user
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    driverLicenseNumber: ''
  });

  const [error, setError] = useState('');

  // Fungsi saat user mengetik
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fungsi saat tombol Register ditekan
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi Password
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    // --- KIRIM DATA KE BACKEND ---
    try {
      // Pastikan PORT ini sama dengan Visual Studio Anda (7144)
      const response = await fetch("https://localhost:7144/api/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registrasi Berhasil! Silakan Login.");
        navigate('/'); // Pindah ke halaman Login
      } else {
        setError(result.message || "Registrasi Gagal");
      }

    } catch (err) {
      console.error(err);
      setError("Gagal menghubungi server. Pastikan Visual Studio running.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-title">Daftar Akun Baru</h2>
        
        {error && <p style={{color:'red', textAlign:'center'}}>{error}</p>}

        <div className="form-group">
          <label className="form-label">Nama Lengkap</label>
          <input type="text" name="name" className="form-input" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-input" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-input" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Konfirmasi Password</label>
          <input type="password" name="confirmPassword" className="form-input" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Nomor HP</label>
          <input type="text" name="phoneNumber" className="form-input" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Alamat</label>
          <input type="text" name="address" className="form-input" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Nomor SIM</label>
          <input type="text" name="driverLicenseNumber" className="form-input" onChange={handleChange} />
        </div>

        <button type="submit" className="btn-register">Daftar Sekarang</button>

        <p className="login-link">
          Sudah punya akun? <Link to="/">Login disini</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;