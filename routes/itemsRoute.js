const express = require("express");

const Items = require("../models/itemsModel");
const { validateBody, validateId } = require("../validation/validateItems");

const route = express.Router();

route.post("/add", validateBody, (req, res) => {
  Items.add(req.body)
    .then((item) => {
      res.status(201).json({ message: "added successfully." });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "there was an error adding the item." });
    });
});

route.get("/", (req, res) => {
  Items.getAll()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.status(500).json({ errMessage: "there was an error." });
    });
});

route.patch("/edit/:id", validateId, (req, res) => {
  const { id } = req.params;

  Items.update(id, req.body)
    .then((item) => {
      res.status(200).json({ message: "updated successfully." });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "there was an error updating the item." });
    });
});

// route.patch("/editprice/:price", (req, res) => {
//   const { category } = req.params;

//   Items.updateCategoryPrice(category, req.body)
//     .then((item) => {
//       res.status(200).json({ message: "price updated successfully" });
//     })
//     .catch((err) => {
//       res.status(500).json({ errMessage: "there was an error." });
//     });
// });

route.delete("/delete/:id", validateId, (req, res) => {
  const { id } = req.params;

  Items.remove(id)
    .then((item) => {
      res.status(200).json({ message: "item removed successfully!" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "there was an error deleting the item." });
    });
});
module.exports = route;
