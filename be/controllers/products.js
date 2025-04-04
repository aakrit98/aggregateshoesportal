const { db } = require("../connect");
const path = require("path");
const fs = require("fs");

async function handleGetAllProduct(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM Products");

    // Update image field to full URL
    const updatedRows = rows.map((product) => ({
      ...product,
      Image: product.Image ? `${req.protocol}://${req.get("host")}/uploads/${product.Image}` : null,
    }));

    res.json(updatedRows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      status: "error",
      msg: "Internal server error",
      error: error.message,
    });
  }
}

async function handlePostProduct(req, res) {
  const { name, description, price } = req.body;
  const productImage = req.file ? req.file.filename : null;

  if (!name || !description || !price) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO Products (Name, Description, Price, Image) 
       VALUES (?, ?, ?, ?)`,
      [name, description, price, productImage]
    );

    const imageUrl = productImage ? `${req.protocol}://${req.get("host")}/uploads/${productImage}` : null;

    return res.status(201).json({
      status: "success",
      id: result.insertId,
      msg: "Product added successfully",
      image: imageUrl,
    });
  } catch (error) {
    console.error("Error inserting into database:", error);
    return res.status(500).json({
      status: "error",
      msg: "Internal server error",
      error: error.message,
    });
  }
}


async function handleDeleteProductById(req, res) {
  const id = Number(req.params.id);

  try {
    const [product] = await db.query("SELECT * FROM Products WHERE id = ?", [id]);

    if (product.length === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const [result] = await db.query("DELETE FROM Products WHERE id = ?", [id]);

    return res.json({
      status: "success",
      msg: "Product deleted successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      status: "error",
      msg: "Internal server error",
    });
  }
}
//-------------------------

async function handleGetProductById(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }
  try {
    const [rows] = await db.query("SELECT * FROM Products WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const product = rows[0];
    product.Image = product.Image ? `${req.protocol}://${req.get("host")}/uploads/${product.Image}` : null;

    return res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      status: "error",
      msg: "Internal server error",
    });
  }
}


async function handleUpdateProductById(req, res) {
  const id = Number(req.params.id);
  const { name, description, price } = req.body;
  const newImage = req.file ? req.file.filename : null;

  try {
    const [product] = await db.query("SELECT * FROM Products WHERE id = ?", [id]);

    if (product.length === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const existingProduct = product[0];
    const updatedName = name || existingProduct.name;
    const updatedDescription = description || existingProduct.description;
    const updatedPrice = price || existingProduct.price;
    let updatedImage = existingProduct.image;

    if (newImage) {
      if (existingProduct.image) {
        const oldImagePath = path.join(__dirname, "../uploads", existingProduct.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.log("Error deleting old image:", err);
        });
      }
      updatedImage = newImage;
    }

    await db.query(
      `UPDATE Products 
       SET name = ?, description = ?, price = ?, image = ? 
       WHERE id = ?`,
      [updatedName, updatedDescription, updatedPrice, updatedImage, id]
    );

    return res.json({ status: "success", msg: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

module.exports = {
  handlePostProduct,
  handleGetAllProduct,
  handleDeleteProductById,
  handleGetProductById,
  handleUpdateProductById,
};
