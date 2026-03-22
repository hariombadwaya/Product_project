const Product = require("../models/product");

// CREATE
async function createProduct(req, res)  {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ
  async function getProducts(req, res) {
    const products = await Product.find();
    res.json(products);
};

// UPDATE
 async function updateProduct(req, res)  {
    const id= req.params.id;
    const data = req.body;
    try{
    const product = await Product.findByIdAndUpdate(id, data, { new: true } );
    res.json(product);
    }
    catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in updating the user",
      error: error.message
    });
}
 }
// DELETE
  async function deleteProduct(req, res) {
    const id= req.params.id
    try
    {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
    console.log("DELETE API HIT", req.params.id);
    }
    catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in delteting the user",
      error: error.message
    });
  }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct

}