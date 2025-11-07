// routes/admin.js
const express = require("express");
const router = express.Router();
const pool = require("../config/database");

const ensureAuthenticated = (req, res, next) => {
  if (req.session.userId) return next();
  req.flash("error", "Silakan login terlebih dahulu.");
  res.redirect("/auth/login");
};

// Helper waktu lalu
const formatTimeAgo = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays === 1) return "Kemarin";
  return `${diffDays} hari lalu`;
};

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  try {
    // Hitung surat
    const [suratMasuk] = await pool.execute(
      "SELECT COUNT(*) AS total FROM surat_masuk"
    );
    const [suratKeluar] = await pool.execute(
      "SELECT COUNT(*) AS total FROM surat_keluar"
    );

    // Ambil aktivitas
    const [activities] = await pool.execute(
      `
      SELECT activity, created_at 
      FROM activity_logs 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT 5
    `,
      [req.session.userId]
    );

    const formattedActivities = activities.map((act) => ({
      ...act,
      timeAgo: formatTimeAgo(act.created_at),
    }));

    res.render("admin/dashboard", {
      title: "Dashboard",
      userName: req.session.userName,
      totalSuratMasuk: suratMasuk[0].total,
      totalSuratKeluar: suratKeluar[0].total,
      totalArsip: suratMasuk[0].total + suratKeluar[0].total,
      activities: formattedActivities,
      messages: req.flash(),
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memuat dashboard.");
    res.redirect("/auth/login");
  }
});

module.exports = router;
