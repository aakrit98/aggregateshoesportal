
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // Multer middleware for file upload
const {
  handleGetAllProduct,
  handlePostProduct,
  handleDeleteProductById,
  handleGetProductById, 
  handleUpdateProductById // ✅ Added missing function
} = require("../controllers/products");

// ✅ Post a new product (with image upload)
router.post("/", upload.single("image"), handlePostProduct);

// ✅ Get all products
router.get("/", handleGetAllProduct); 

router.patch("/:Id" , upload.single("image") , handleUpdateProductById)

// ✅ Get and delete product by ID
router
  .route("/:id")
  .get(handleGetProductById) 
  
  .delete(handleDeleteProductById); 


module.exports = router;
