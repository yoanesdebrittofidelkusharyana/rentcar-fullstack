import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RentCar.css';

const RentCar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mengambil data yang dikirim dari Dashboard
  const { mobil, pickupDate, returnDate } = location.state || {};
  const userEmail = localStorage.getItem('userEmail'); // Kita butuh email untuk API
  const userName = localStorage.getItem('user');

  // Jika user maksa masuk lewat URL tanpa pilih mobil
  if (!mobil || !pickupDate || !returnDate) {
    return (
      <div style={{textAlign:'center', marginTop:'50px'}}>
        <h2>Data Tidak Lengkap!</h2>
        <button onClick={() => navigate('/dashboard')}>Kembali ke Dashboard</button>
      </div>
    );
  }

  // --- HITUNG DURASI & HARGA ---
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const diffTime = Math.abs(end - start);
  let duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (duration < 1) duration = 1; // Minimal 1 hari
  
  const pricePerDay = mobil.pricePerDay || mobil.PricePerDay || 0;
  const totalPrice = duration * pricePerDay;

  // --- FUNGSI KIRIM KE API ---
  const handleSewa = async () => {
    // Cek apakah user sudah login
    if (!userName) {
      alert("Anda harus Login dulu!");
      navigate('/');
      return;
    }

    const bookingData = {
      CarId: mobil.carId || mobil.CarId, // Pastikan ID Mobil ada
      CustomerEmail: userEmail,          // Email User (PENTING)
      RentalDate: pickupDate,
      ReturnDate: returnDate,
      PricePerDay: pricePerDay
    };

    try {
      // GANTI PORT SESUAI VS STUDIO ANDA (7144)
      const response = await fetch("https://localhost:7144/api/rental/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Booking Berhasil! Terima kasih telah menyewa.");
        navigate('/dashboard'); // Balik ke Dashboard
      } else {
        alert("Gagal Booking: " + (result.message || "Unknown Error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error koneksi ke Server.");
    }
  };

  return (
    <div className="rent-container">
      <div className="rent-card">
        <div className="rent-header">
          <h2>Konfirmasi Sewa Mobil</h2>
        </div>
        
        <div className="rent-body">
          {/* KIRI: Gambar */}
          <div className="rent-image-section">
            <img src={mobil.imageLink || mobil.ImageLink} alt={mobil.name} />
          </div>

          {/* KANAN: Detail */}
          <div className="rent-info-section">
            <div className="info-row">
              <span className="label">Penyewa</span>
              <span className="value">{userName}</span>
            </div>
            <div className="info-row">
              <span className="label">Mobil</span>
              <span className="value">{mobil.name || mobil.Name} ({mobil.year || mobil.Year})</span>
            </div>
            <div className="info-row">
              <span className="label">Tanggal Ambil</span>
              <span className="value">{pickupDate}</span>
            </div>
            <div className="info-row">
              <span className="label">Tanggal Kembali</span>
              <span className="value">{returnDate}</span>
            </div>
            <div className="info-row">
              <span className="label">Durasi</span>
              <span className="value">{duration} Hari</span>
            </div>
            
            <div className="total-box">
              <div className="info-row">
                <span className="label">Harga per Hari</span>
                <span className="value">Rp {pricePerDay.toLocaleString()}</span>
              </div>
              <h3 style={{margin:'10px 0 0 0', fontSize:'14px', color:'#555'}}>Total Pembayaran</h3>
              <p className="total-price">Rp {totalPrice.toLocaleString()}</p>
            </div>

            <button onClick={handleSewa} className="btn-confirm">
              Konfirmasi & Sewa
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-cancel">
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentCar;