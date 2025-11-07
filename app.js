// app.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const csrf = require("csurf");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const suratRoutes = require("./routes/surat");

const app = express();
const PORT = process.env.PORT || 50000;

if (!process.env.SESSION_SECRET) {
  console.error("❌ SESSION_SECRET belum diatur di .env");
  process.exit(1);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(flash());
const csrfProtection = csrf({ cookie: false });
app.use(csrfProtection);

// Helper Format Tanggal
app.locals.formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.user = req.session.userId
    ? { name: req.session.userName, role: req.session.userRole }
    : null;
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/admin", suratRoutes);

// ✅ HALAMAN UTAMA: Tampilkan landing page untuk pengunjung
app.get("/", (req, res) => {
  if (req.session.userId) {
    // Jika sudah login, arahkan ke dashboard
    return res.redirect("/admin/dashboard");
  }
  // Jika belum login, tampilkan halaman utama
  res.render("home", {
    title: "SuratKu - Sistem Persuratan Digital",
    messages: req.flash(), // ✅ Menyertakan messages agar tidak error di EJS
  });
});

// 404
app.use((req, res) => {
  res.status(404).render("errors/404", { title: "Halaman Tidak Ditemukan" });
});

// Error handler
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    req.flash("error", "Token keamanan tidak valid.");
    return res.redirect("/auth/login");
  }
  console.error(err.stack);
  res.status(500).send("Terjadi kesalahan pada server.");
});

app.listen(PORT, () => {
  console.log(`✅ Aplikasi berjalan di http://localhost:${PORT}`);
});
