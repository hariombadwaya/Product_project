const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const { validateProduct } = require("../middleware/validation");

// Create 
router.post("/create", auth, validateProduct, createProduct);

// read 
router.get("/getproduct", getProducts);

// Update 
router.put("/update/:id", auth, validateProduct, updateProduct);

// delete 
router.delete("/delete/:id", auth, deleteProduct);

module.exports = router;