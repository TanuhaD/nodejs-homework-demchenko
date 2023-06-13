const { Shop } = require("../models/shop");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAllShops = async (req, res) => {
  const result = await Shop.find({});
  if (!result) {
    throw HttpError(404, `Shop not found`);
  }
  res.json(result);
};

module.exports = {
  getAllShops: ctrlWrapper(getAllShops),
};
