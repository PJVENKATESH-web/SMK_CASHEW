const express = require("express");
const { param, query } = require("express-validator");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {protect,adminOnly}=require('../middleware/authMiddleware')
const validate = require("../middleware/validationMiddleware");
const router = express.Router();

router.get(
  "/",
  [
    query("type")
      .optional()
      .isIn(["raw", "roasted", "salted", "flavored", "organic"])
      .withMessage("Invalid product type"),
    query("minPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("minPrice must be a positive number"),
    query("maxPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("maxPrice must be a positive number"),
    query("page")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("page must be at least 1"),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("limit must be between 1 and 100"),
  ],
  validate,
  getProducts,
);

router.post('/',protect,adminOnly,createProduct);
router.put('/:id',protect,adminOnly,updateProduct);
router.delete('/:id',protect,adminOnly,deleteProduct);

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Valid productId is required")],
  validate,
  getProductById,
);

module.exports = router;
