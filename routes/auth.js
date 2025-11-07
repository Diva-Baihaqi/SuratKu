// routes/auth.js
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const pool = require("../config/database");

router.get("/login", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/admin/dashboard");
  }
  res.render("auth/login", { title: "Login", messages: req.flash() });
});

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email tidak valid"),
    body("password").notEmpty().withMessage("Password wajib diisi"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
      return res.redirect("/auth/login");
    }

    const { email, password } = req.body;
    try {
      const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      if (rows.length === 0) {
        req.flash("error", "Email atau password salah");
        return res.redirect("/auth/login");
      }

      const user = rows[0];
      if (!user.is_approved) {
        req.flash("error", "Akun belum disetujui");
        return res.redirect("/auth/login");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        req.flash("error", "Email atau password salah");
        return res.redirect("/auth/login");
      }

      req.session.userId = user.id;
      req.session.userRole = user.role;
      req.session.userName = user.name;

      return res.redirect("/admin/dashboard");
    } catch (err) {
      console.error(err);
      req.flash("error", "Terjadi kesalahan server");
      return res.redirect("/auth/login");
    }
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

module.exports = router;
