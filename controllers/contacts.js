const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const removeLowDashOnId = ({ _id, name, email, phone, favorite, owner }) => {
  return { id: _id, name, email, phone, favorite, owner };
};

const getAll = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const filter = { owner: userId };
  if (favorite !== null) {
    filter.favorite = favorite;
  }
  const skip = (page - 1) * limit;
  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "subscription email");
  const updContactsId = result.map(removeLowDashOnId);
  res.json(updContactsId);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(removeLowDashOnId(result));
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(removeLowDashOnId(result));
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(removeLowDashOnId(result));
};

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(removeLowDashOnId(result));
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  deleteById: ctrlWrapper(deleteById),
};
