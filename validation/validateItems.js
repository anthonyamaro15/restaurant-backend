const Items = require("../models/itemsModel");

function validateBody(req, res, next) {
  const {
    name,
    img_url,
    price,
    desc_english,
    desc_spanish,
    category,
  } = req.body;

  if (
    !name ||
    !img_url ||
    !price ||
    !desc_english ||
    !desc_spanish ||
    !category
  ) {
    res.status(400).json({ errMessage: "please enter require fields." });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  const { id } = req.params;
  Items.findById(id)
    .then((item) => {
      if (!item) {
        res.status(404).json({ errMessage: "invalid item id." });
      } else {
        next();
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "there was an error finding the item." });
    });
}

module.exports = {
  validateBody,
  validateId,
};
