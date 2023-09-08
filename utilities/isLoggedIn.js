const isLoggedIn = (req, res, next) => {
  try {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    next();
  } catch (err) {
    console.error("Error in isLoggedIn middleware:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = isLoggedIn;
