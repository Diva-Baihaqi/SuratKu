function requireAuth(req, res, next) {
  if (!req.session.userId) {
    req.flash('error', 'Anda harus login terlebih dahulu');
    return res.redirect('/auth/login');
  }
  next();
}

module.exports = { requireAuth };
