USE RentCarDB;
GO

-- Membuat Tabel Transaksi Penyewaan sesuai ERD
CREATE TABLE TrRental (
    rental_id NVARCHAR(36) PRIMARY KEY,       -- ID Transaksi (GUID)
    rental_date DATETIME2 NOT NULL,           -- Tanggal Mulai
    return_date DATETIME2 NOT NULL,           -- Tanggal Kembali
    total_price DECIMAL(18, 2) NOT NULL,      -- Total Harga
    payment_status NVARCHAR(50) NOT NULL,     -- Status: "Lunas" / "Belum"
    customer_id NVARCHAR(36) NOT NULL,        -- Siapa yang sewa
    car_id NVARCHAR(36) NOT NULL              -- Mobil apa yang disewa
);
GO

-- Opsional: Membuat relasi (Foreign Key) agar data konsisten
-- Ini memastikan customer_id dan car_id benar-benar ada di tabel induknya
ALTER TABLE TrRental
ADD CONSTRAINT FK_TrRental_MsCustomer 
FOREIGN KEY (customer_id) REFERENCES MsCustomer(customer_id);

ALTER TABLE TrRental
ADD CONSTRAINT FK_TrRental_MsCar 
FOREIGN KEY (car_id) REFERENCES MsCar(car_id);
GO