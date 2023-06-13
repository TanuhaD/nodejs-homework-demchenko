// const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { mongooseHandleError } = require("../helpers");

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    products: [
      {
        id: String,
        name: String,
        price: Number,
      },
    ],
  },
  { versionKey: false }
);

shopSchema.post("save", mongooseHandleError);

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   phone: Joi.string(),
//   email: Joi.string(),
//   favorite: Joi.boolean(),
// });
// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// const schemas = {
//   addSchema,
//   updateFavoriteSchema,
// };

const Shop = model("shop", shopSchema);

module.exports = { Shop };
