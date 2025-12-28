USE RentCarDB;
GO

-- PERBAIKAN: Kita cari berdasarkan NAMA mobil (name), bukan modelnya.
-- Ini akan memperbaiki Xpander dan Jazz yang tadi gagal.

UPDATE MsCar SET image_link = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/2018_Mitsubishi_Xpander_Ultimate_1.5_NC1W_%2820190623%29.jpg/1200px-2018_Mitsubishi_Xpander_Ultimate_1.5_NC1W_%2820190623%29.jpg' 
WHERE name LIKE '%Xpander%';

UPDATE MsCar SET image_link = 'https://momobil.id/_next/image?url=https%3A%2F%2Fmomobil.id%2Fnews%2Fwp-content%2Fuploads%2F2021%2F03%2F1.jpg&w=3840&q=75' 
WHERE name LIKE '%Jazz%';

-- Jalankan ulang yang lain biar yakin semuanya seragam
UPDATE MsCar SET image_link = 'https://thumb.katadata.co.id/frontend/thumbnail/2024/12/25/zigi-676b5b875db1f-daihatsu-ayla-bekas_910_512.jpg' WHERE name LIKE '%Ayla%';
UPDATE MsCar SET image_link = 'https://upload.wikimedia.org/wikipedia/commons/e/e2/2018_Honda_HR-V_VTi-S_wagon_%282018-08-27%29_01.jpg' WHERE name LIKE '%HR-V%';
UPDATE MsCar SET image_link = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/2022_Toyota_Avanza_1.5_G_Toyota_Safety_Sense_W101RE_%2820220403%29.jpg' WHERE name LIKE '%Avanza%';
UPDATE MsCar SET image_link = 'https://img.mobilmo.com/2021/06/29/UOgDFPLZ/toyota-yaris-trd-sportivo-cvt-2020-c643.png' WHERE name LIKE '%Yaris%';
GO

-- Cek hasilnya. Pastikan SEMUA kolom image_link sekarang diawali 'https://'
SELECT name, model, image_link FROM MsCar;