const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const pool = require("../config/database");

// Middleware: Pastikan user sudah login
const ensureAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  req.flash("error", "Silakan login terlebih dahulu.");
  res.redirect("/auth/login");
};

// =============== SURAT MASUK ===============
router.get("/surat-masuk", ensureAuthenticated, async (req, res) => {
  const [rows] = await pool.execute(
    "SELECT * FROM surat_masuk ORDER BY tgl_terima DESC"
  );
  res.render("admin/surat-masuk", {
    title: "Surat Masuk",
    surat: rows,
    messages: req.flash(),
  });
});

router.get("/surat-masuk/tambah", ensureAuthenticated, (req, res) => {
  res.render("admin/surat-form", {
    title: "Tambah Surat Masuk",
    type: "masuk",
    action: "/admin/surat-masuk/tambah",
    data: null,
  });
});

router.post(
  "/surat-masuk/tambah",
  ensureAuthenticated,
  [
    body("nomor_surat").notEmpty().withMessage("Nomor surat wajib diisi"),
    body("tanggal_surat").notEmpty().withMessage("Tanggal surat wajib diisi"),
    body("tgl_terima").notEmpty().withMessage("Tanggal terima wajib diisi"),
    body("pengirim").notEmpty().withMessage("Pengirim wajib diisi"),
    body("perihal").notEmpty().withMessage("Perihal wajib diisi"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
      return res.redirect("/admin/surat-masuk/tambah");
    }

    const { nomor_surat, tanggal_surat, tgl_terima, pengirim, perihal } =
      req.body;
    await pool.execute(
      "INSERT INTO surat_masuk (nomor_surat, tanggal_surat, tgl_terima, pengirim, perihal) VALUES (?, ?, ?, ?, ?)",
      [nomor_surat, tanggal_surat, tgl_terima, pengirim, perihal]
    );

    // 🔥 LOG AKTIVITAS
    await pool.execute(
      "INSERT INTO activity_logs (user_id, activity) VALUES (?, ?)",
      [req.session.userId, `Mencatat surat masuk: ${nomor_surat}`]
    );

    req.flash("success", "Surat masuk berhasil ditambahkan");
    res.redirect("/admin/surat-masuk");
  }
);

router.get("/surat-masuk/edit/:id", ensureAuthenticated, async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM surat_masuk WHERE id = ?", [
    req.params.id,
  ]);
  if (rows.length === 0) return res.redirect("/admin/surat-masuk");
  res.render("admin/surat-form", {
    title: "Edit Surat Masuk",
    type: "masuk",
    action: `/admin/surat-masuk/edit/${req.params.id}`,
    data: rows[0],
  });
});

router.post(
  "/surat-masuk/edit/:id",
  ensureAuthenticated,
  [
    body("nomor_surat").notEmpty(),
    body("tanggal_surat").notEmpty(),
    body("tgl_terima").notEmpty(),
    body("pengirim").notEmpty(),
    body("perihal").notEmpty(),
  ],
  async (req, res) => {
    const { nomor_surat, tanggal_surat, tgl_terima, pengirim, perihal } =
      req.body;
    await pool.execute(
      "UPDATE surat_masuk SET nomor_surat = ?, tanggal_surat = ?, tgl_terima = ?, pengirim = ?, perihal = ? WHERE id = ?",
      [nomor_surat, tanggal_surat, tgl_terima, pengirim, perihal, req.params.id]
    );

    // 🔥 LOG AKTIVITAS
    await pool.execute(
      "INSERT INTO activity_logs (user_id, activity) VALUES (?, ?)",
      [req.session.userId, `Memperbarui surat masuk: ${nomor_surat}`]
    );

    req.flash("success", "Surat masuk berhasil diperbarui");
    res.redirect("/admin/surat-masuk");
  }
);

router.get("/surat-masuk/hapus/:id", ensureAuthenticated, async (req, res) => {
  // Ambil nomor surat untuk log
  const [rows] = await pool.execute(
    "SELECT nomor_surat FROM surat_masuk WHERE id = ?",
    [req.params.id]
  );
  const nomor = rows[0]?.nomor_surat || `ID ${req.params.id}`;

  await pool.execute("DELETE FROM surat_masuk WHERE id = ?", [req.params.id]);

  // 🔥 LOG AKTIVITAS
  await pool.execute(
    "INSERT INTO activity_logs (user_id, activity) VALUES (?, ?)",
    [req.session.userId, `Menghapus surat masuk: ${nomor}`]
  );

  req.flash("success", "Surat masuk berhasil dihapus");
  res.redirect("/admin/surat-masuk");
});

// =============== SURAT KELUAR ===============
router.get("/surat-keluar", ensureAuthenticated, async (req, res) => {
  const [rows] = await pool.execute(
    "SELECT * FROM surat_keluar ORDER BY tanggal_surat DESC"
  );
  res.render("admin/surat-keluar", {
    title: "Surat Keluar",
    surat: rows,
    messages: req.flash(),
  });
});

router.get("/surat-keluar/tambah", ensureAuthenticated, (req, res) => {
  res.render("admin/surat-form", {
    title: "Tambah Surat Keluar",
    type: "keluar",
    action: "/admin/surat-keluar/tambah",
    data: null,
  });
});

router.post(
  "/surat-keluar/tambah",
  ensureAuthenticated,
  [
    body("nomor_surat").notEmpty().withMessage("Nomor surat wajib diisi"),
    body("tanggal_surat").notEmpty().withMessage("Tanggal surat wajib diisi"),
    body("tujuan").notEmpty().withMessage("Tujuan wajib diisi"),
    body("perihal").notEmpty().withMessage("Perihal wajib diisi"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
      return res.redirect("/admin/surat-keluar/tambah");
    }

    const { nomor_surat, tanggal_surat, tujuan, perihal } = req.body;
    await pool.execute(
      "INSERT INTO surat_keluar (nomor_surat, tanggal_surat, tujuan, perihal) VALUES (?, ?, ?, ?)",
      [nomor_surat, tanggal_surat, tujuan, perihal]
    );

    // 🔥 LOG AKTIVITAS
    await pool.execute(
      "INSERT INTO activity_logs (user_id, activity) VALUES (?, ?)",
      [req.session.userId, `Mencatat surat keluar: ${nomor_surat}`]
    );

    req.flash("success", "Surat keluar berhasil ditambahkan");
    res.redirect("/admin/surat-keluar");
  }
);

router.get("/surat-keluar/edit/:id", ensureAuthenticated, async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM surat_keluar WHERE id = ?", [
    req.params.id,
  ]);
  if (rows.length === 0) return res.redirect("/admin/surat-keluar");
  res.render("admin/surat-form", {
    title: "Edit Surat Keluar",
    type: "keluar",
    action: `/admin/surat-keluar/edit/${req.params.id}`,
    data: rows[0],
  });
});

router.post(
  "/surat-keluar/edit/:id",
  ensureAuthenticated,
  [
    body("nomor_surat").notEmpty(),
    body("tanggal_surat").notEmpty(),
    body("tujuan").notEmpty(),
    body("perihal").notEmpty(),
  ],
  async (req, res) => {
    const { nomor_surat, tanggal_surat, tujuan, perihal } = req.body;
    await pool.execute(
      "UPDATE surat_keluar SET nomor_surat = ?, tanggal_surat = ?, tujuan = ?, perihal = ? WHERE id = ?",
      [nomor_surat, tanggal_surat, tujuan, perihal, req.params.id]
    );

    // 🔥 LOG AKTIVITAS
    await pool.execute(
      "INSERT INTO activity_logs (user_id, activity) VALUES (?, ?)",
      [req.session.userId, `Memperbarui surat keluar: ${nomor_surat}`]
    );

    req.flash("success", "Surat keluar berhasil diperbarui");
    res.redirect("/admin/surat-keluar");
  }
);

router.get("/surat-keluar/hapus/:id", ensureAuthenticated, async (req, res) => {
  // Ambil nomor surat untuk log
  const [rows] = await pool.execute(
    "SELECT nomor_surat FROM surat_keluar WHERE id = ?",
    [req.params.id]
  );
  const nomor = rows[0]?.nomor_surat || `ID ${req.params.id}`;

  await pool.execute("DELETE FROM surat_keluar WHERE id = ?", [req.params.id]);

  // 🔥 LOG AKTIVITAS
  await pool.execute(
    "INSERT INTO activity_logs (user_id, activity) VALUES (?, ?)",
    [req.session.userId, `Menghapus surat keluar: ${nomor}`]
  );

  req.flash("success", "Surat keluar berhasil dihapus");
  res.redirect("/admin/surat-keluar");
});

module.exports = router;
