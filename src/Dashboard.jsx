import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  // State untuk Hamburger Menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State Data Mobil
  const [mobilList, setMobilList] = useState([]);
  
  // State Filter & Sorting
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // --- FUNGSI FETCH DATA ---
  const fetchCars = (page) => {
    // Pastikan Port 7144 Sesuai
    const API_URL = `https://localhost:7144/api/car?page=${page}&pageSize=3`; 

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Logika Pintar: Handle huruf besar/kecil dari Backend
        const carsData = data.cars || data.Cars || [];
        const totalPagesData = data.totalPages || data.TotalPages || 1;
        const currentPageData = data.currentPage || data.CurrentPage || 1;

        if (Array.isArray(carsData)) {
          setMobilList(carsData);
          setTotalPages(totalPagesData);
          setCurrentPage(currentPageData);
        } else {
          setMobilList([]);
        }
      })
      .catch((err) => console.error("Error Fetching:", err));
  };

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage]);

  // --- LOGIKA FILTER & SORTING (Client Side) ---
  const getProcessedCars = () => {
    let result = [...mobilList];

    // Filter Tahun
    if (yearFilter !== 'all') {
      result = result.filter(mobil => {
        const tahun = mobil.year || mobil.Year;
        return tahun && tahun.toString() === yearFilter;
      });
    }

    // Sorting
    if (sortOrder === 'asc') {
      result.sort((a, b) => (a.pricePerDay || a.PricePerDay || 0) - (b.pricePerDay || b.PricePerDay || 0));
    } else {
      result.sort((a, b) => (b.pricePerDay || b.PricePerDay || 0) - (a.pricePerDay || a.PricePerDay || 0));
    }
    return result;
  };

  const displayedMobil = getProcessedCars();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      
      {/* --- SIDEBAR MENU (HAMBURGER) --- */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      
      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <span>Menu</span>
          <button className="close-btn" onClick={toggleSidebar}>&times;</button>
        </div>
        <ul className="sidebar-menu">
          <li><button onClick={() => { navigate('/dashboard'); toggleSidebar(); }}>🏠 Home</button></li>
          <li><button onClick={() => { navigate('/history'); toggleSidebar(); }}>📅 Riwayat Penyewaan</button></li>
          <li><button onClick={() => { alert("Hubungi kami di: cs@rentcar.com"); toggleSidebar(); }}>📞 Kontak Kami</button></li>
          <li><button className="logout-link" onClick={handleLogout}>🚪 Logout</button></li>
        </ul>
      </div>

      {/* --- NAVBAR ATAS --- */}
      <nav className="navbar">
        <div className="nav-left">
          {/* Tombol Hamburger */}
          <button className="hamburger-btn" onClick={toggleSidebar}>
            &#9776; {/* Simbol Garis Tiga */}
          </button>
          <h1 className="nav-title">RentCar Indonesia Official✅ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤSEWA SEKARANG 📢</h1>
        </div>
        <div className="nav-right">
          <span className="user-greeting">Selamat Datang {user} di Website RentCar</span>
        </div>
      </nav>

      {/* --- KONTEN UTAMA --- */}
      <div className="content">
        <h2 className="welcome-text">Penyewaan Kendaraan Daring di DKI Jakarta 😝</h2>

        {/* Filter Area */}
        <div className="search-container">
          <div className="filter-group">
            <label className="filter-label">Tanggal Pickup:</label>
            <input type="date" className="filter-input" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
          </div>
          <div className="filter-group">
            <label className="filter-label">Tanggal Pengembalian:</label>
            <input type="date" className="filter-input" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
          <div className="filter-group">
            <label className="filter-label">Filter Tahun:</label>
            <select className="filter-input" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
              <option value="all">Semua Tahun</option>
              <option value="2023">2023</option>
              <option value="2021">2021</option>
              <option value="2019">2019</option>
            </select>
          </div>
          <button className="btn-cari" onClick={() => fetchCars(1)}>Refresh</button>
        </div>

        {/* Sort Area */}
        <div className="sort-container">
          <label style={{fontWeight:'bold'}}>Urutan Harga Kendaraan:</label>
          <select className="filter-input" style={{width: '200px'}} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Terendah - Tertinggi</option>
            <option value="desc">Tertinggi - Terendah</option>
          </select>
        </div>

        {/* Grid Mobil */}
        <div className="car-grid">
          {displayedMobil.length > 0 ? (
            displayedMobil.map((mobil, index) => (
              <div key={index} className="car-card">
                {mobil.imageLink || mobil.ImageLink ? 
                  <img src={mobil.imageLink || mobil.ImageLink} alt={mobil.name} /> 
                  : <div style={{height:'180px', background:'#eee', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'15px'}}>No Image</div>
                }
                
                <h3 className="car-name">{mobil.name || mobil.Name}</h3>
                <p style={{color:'#666', fontSize:'14px', margin:'0'}}>Tahun: {mobil.year || mobil.Year}</p>
                
                <p className="car-price">
                  Rp {(mobil.pricePerDay || mobil.PricePerDay || 0).toLocaleString('id-ID')} / hari
                </p>
                
                <button 
                  className="btn-pilih"
                  onClick={() => {
                    if(!pickupDate || !returnDate) {
                      alert("Mohon pilih tanggal pickup dan return dulu!");
                      return;
                    }
                    navigate('/rent-confirm', { 
                      state: { mobil: mobil, pickupDate: pickupDate, returnDate: returnDate } 
                    });
                  }}>
                  Pilih Mobil
                </button>
              </div>
            ))
          ) : (
             <p style={{gridColumn:'1/-1', textAlign:'center', padding:'30px', color:'#777'}}>
               Tidak ada data mobil. Coba klik Refresh.
             </p>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination-area">
          <button 
            className="btn-page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}>
            Prev
          </button>

          <span className="page-info">
            Halaman {currentPage} dari {totalPages}
          </span>

          <button 
            className="btn-page"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}>
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;