const { body, validationResult } = require("express-validator");

exports.validateProduct = [
    body("metaTitle").notEmpty(),
    body("name").notEmpty(),
    body("slug").notEmpty(),
    body("image").notEmpty(),
    body("price").isNumeric(),
    body("discountedPrice").optional().isNumeric(),
    body("description").notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        next();
    }
];