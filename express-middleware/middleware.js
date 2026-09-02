const inputCleaner=(req, res, next) => {
  // Convert username to lowercase
  if (req.body.username) {
    req.body.username = req.body.username.toLowerCase();
  }

  // Strip HTML tags from comment
  if (req.body.comment) {
    req.body.comment = req.body.comment.replace(/<[^>]*>/g, "");
  }

  next();
}

const inputValidator= (req, res, next) => {
  if (req.body.username && req.body.username.length >= 3) {
    next();
  } else {
    res.redirect(
      "/form?error=Username must be at least 3 characters."
    );
  }
}

module.exports = {inputCleaner, inputValidator}