const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Define upload directory
const uploadDir = path.join(__dirname, "../uploads");

// ✅ Ensure "uploads" folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


// File filter (optional: restrict to images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};


// ✅ Create the upload middleware
const upload = multer({ storage , fileFilter });

module.exports = upload;
