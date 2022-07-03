const Product = require("../models/product");
// const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  // products.push({ title: req.body.title });
  console.log("req.body", req.body);
  const { title, imageURL, price, description } = req.body;
  const product = new Product(null, title, imageURL, price, description);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  // products.push({ title: req.body.title });
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const {
    title: updatedTitle,
    imageURL: updatedImageURL,
    price: updatedPrice,
    description: updatedDescription,
  } = req.body;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageURL,
    updatedPrice,
    updatedDescription
  );
  updatedProduct.save();
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
