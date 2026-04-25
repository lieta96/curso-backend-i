import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    validator: (title) => {
      return title.length > 2;
    },
  },
  description: String,
  price: {
    type: Number,
    required: true,
    validator: (price) => {
      return price >= 0;
    },
  },
  category: String,
  sotck: {
    type: Number,
    validator: (stock) => {
      return stock >= 0;
    },
    default: 1,
  },
  status: Boolean,
  code: { type: String, unique: true, required: true },
  thumbnails: { type: [String], default: [] },
});

export const productModel = model(
  "product", // acá va el nombre de la colección de la DB
  productSchema,
);
