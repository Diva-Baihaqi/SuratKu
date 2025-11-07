# 📬 SuratKu - Sistem Persuratan Digital Terpadu
**Sistem Persuratan Digital Terpadu untuk Pelayanan Publik yang Lebih Efektif**

---

## 🌟 Deskripsi

**SuratKu** adalah aplikasi berbasis web untuk mengelola surat masuk dan surat keluar secara digital. Dirancang khusus untuk instansi pemerintah, sekolah, dan organisasi yang membutuhkan sistem persuratan yang efisien, aman, dan terintegrasi.

Aplikasi ini Open Source dapat menggantikan sistem administrasi surat konvensional dengan solusi digital modern yang memudahkan proses pencatatan, pelacakan, dan arsip surat secara real-time.

---

## 🚀 Fitur Utama

✅ **Manajemen Surat Masuk**

- Input nomor surat, tanggal surat, tanggal terima, pengirim, perihal
- Upload file surat
- Edit dan hapus data

✅ **Manajemen Surat Keluar**

- Input nomor surat, tanggal surat, tujuan, perihal
- Upload file surat
- Edit dan hapus data

✅ **Dashboard Admin**

- Statistik real-time surat masuk & keluar
- Grafik visualisasi data
- Aktivitas terbaru dengan log detail

✅ **Keamanan Tingkat Tinggi**

- Enkripsi password dengan bcrypt
- Proteksi CSRF token
- Session management yang aman
- Role-based access control

✅ **User Experience Modern**

- Responsive design (mobile & desktop)
- Dark/Light mode toggle
- Animasi dan transisi halus
- Background gambar kustom

✅ **Fitur Tambahan**

- Logging aktivitas user
- Clear activity log
- Flash messages untuk feedback pengguna
- Error handling yang baik

---

## ⚙️ Instalasi & Konfigurasi

### Prasyarat

- Node.js v18.x atau lebih baru
- MySQL Server 8.0+
- Git

### Langkah Instalasi

1. **Clone repository:**

   ```bash
   git clone https://github.com/username/suratku.git
   cd suratku
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Buat file `.env`:**

   ```env
   SESSION_SECRET=rahasia_sangat_kuat_123!
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_mysql_password
   DB_NAME=surat_app
   PORT=50000
   ```

4. **Import database:**

   - Buat database `surat_app` di MySQL
   - Import file `database/surat_app.sql` ke database Anda

5. **Jalankan aplikasi:**

   ```bash
   node app.js
   ```

6. **Akses aplikasi:**
   Buka browser dan akses:
   ```
   http://localhost:50000
   ```

### Akun Default

Setelah import database, akun default tersedia:

- Email: `admin@example.com`
- Password: `password123`

---

## 📂 Struktur Folder

```
KODE PROGRAM/
├── config/                # Konfigurasi aplikasi
├── database/              # File SQL database
├── middleware/            # Middleware Express
├── routes/                # Routing aplikasi
├── views/                 # Template EJS
│   ├── admin/             # View admin
│   ├── auth/              # View autentikasi
│   ├── errors/            # Error pages
│   └── partials/          # Komponen partial view
├── .env                   # Variabel lingkungan
├── app.js                 # Entry point aplikasi
└── package.json           # Dependencies & scripts
```

---

## 🛠 Teknologi yang Digunakan

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **MySQL2** - Driver database
- **Bcrypt.js** - Password hashing
- **Express-Session** - Session management
- **CSURF** - CSRF protection

### Frontend

- **EJS** - Template engine
- **Bootstrap 5** - CSS framework
- **Feather Icons** - Vector icons
- **JavaScript** - Interaktivitas

### Tools

- **Nodemon** - Development server
- **Dotenv** - Environment variables
- **Connect-Flash** - Flash messages
- **Express-EJS-Layouts** - Layout management

---

## 🖼️ Tampilan Aplikasi

### Halaman Utama

![Halaman Utama](https://i.ibb.co/2YCGVdMQ/1-Halaman-Utama.png)

### Halaman Login

![Halaman Utama](https://i.ibb.co/1JXynQ16/2-Halaman-Login.png)

### Dashboard Admin

![Dashboard Admin](https://i.ibb.co/KjTh1cgp/3-Halaman-Dashboard.png)

---

## 🤝 Kontribusi

Kontribusi sangat dihargai! Silakan ikuti langkah berikut:

1. Fork repository ini
2. Buat branch feature Anda: `git checkout -b feature/nama-feature`
3. Commit perubahan Anda: `git commit -m 'Tambahkan fitur baru'`
4. Push ke branch Anda: `git push origin feature/nama-feature`
5. Buka pull request

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) - lihat file LICENSE untuk detail lengkap.

---

## 📞 Kontak

Untuk pertanyaan lebih lanjut, silakan hubungi:

**Bang Div**  
📧 Email: bangdiv.dev@gmail.com  
💻 GitHub: [@bangdiv](https://github.com/Diva-Baihaqi)

---

> **SuratKu** © 2025 - Sistem Persuratan Digital Terpadu untuk Pelayanan Publik yang Lebih Efektif

---

⭐ Jangan lupa berikan star pada repository ini jika Anda menyukai proyek ini! ⭐


