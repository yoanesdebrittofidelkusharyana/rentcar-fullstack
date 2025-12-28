import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const [historyList, setHistoryList] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) {
      alert("Silakan login terlebih dahulu.");
      navigate('/');
      return;
    }

    // Ambil Data dari API (Sesuaikan Port 7144)
    fetch(`https://localhost:7144/api/rental/history?email=${userEmail}`)
      .then(res => res.json())
      .then(data => {
        console.log("History Data:", data);
        setHistoryList(data);
      })
      .catch(err => console.error("Gagal ambil history:", err));
  }, [userEmail, navigate]);

  // Fungsi Hitung Durasi
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days < 1 ? 1 : days;
  };

  // Fungsi Format Tanggal
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h2 className="history-title">Riwayat Penyewaan Saya</h2>
        <Link to="/dashboard" className="btn-back">← Kembali Dashboard</Link>
      </div>

      {historyList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{color:'#555'}}>Belum ada riwayat penyewaan.</h3>
          <p style={{color:'#888'}}>Ayo mulai petualanganmu dengan menyewa mobil kami!</p>
        </div>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th style={{width: '22%'}}>Mobil</th>
              <th style={{width: '28%'}}>Tanggal Sewa</th>
              <th style={{width: '15%'}}>Harga / Hari</th>
              <th style={{width: '10%'}}>Durasi</th>
              <th style={{width: '15%'}}>Total Harga</th>
              <th style={{width: '10%', textAlign: 'center'}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {historyList.map((item, index) => {
              const rentDate = item.rentalDate || item.RentalDate;
              const retDate = item.returnDate || item.ReturnDate;
              const priceDay = item.pricePerDay || item.PricePerDay || 0;
              const total = item.totalPrice || item.TotalPrice || 0;
              const durasi = calculateDays(rentDate, retDate);

              return (
                <tr key={index}>
                  {/* KOLOM 1: Nama Mobil */}
                  <td>
                    <span style={{fontWeight:'700', fontSize:'15px', color:'#2c3e50'}}>
                      {item.carName || item.CarName}
                    </span>
                    <span className="sub-text">
                      Tahun: {item.carYear || item.CarYear}
                    </span>
                  </td>

                  {/* KOLOM 2: Tanggal */}
                  <td className="date-range">
                    {formatDate(rentDate)}
                    <div style={{fontSize:'12px', color:'#999', margin:'2px 0'}}>sampai</div>
                    {formatDate(retDate)}
                  </td>

                  {/* KOLOM 3: Harga Satuan */}
                  <td style={{fontWeight:'600', color:'#555'}}>
                    Rp {priceDay.toLocaleString('id-ID')}
                  </td>

                  {/* KOLOM 4: Durasi */}
                  <td style={{textAlign:'left'}}>
                    <span style={{background:'#f1f3f5', padding:'4px 10px', borderRadius:'10px', fontSize:'13px', fontWeight:'600', color:'#495057'}}>
                      {durasi} Hari
                    </span>
                  </td>

                  {/* KOLOM 5: Total Harga */}
                  <td className="price-total">
                    Rp {total.toLocaleString('id-ID')}
                  </td>

                  {/* KOLOM 6: Status Badge */}
                  <td style={{textAlign:'center'}}>
                    <span className="status-badge">
                      {item.paymentStatus || item.PaymentStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;