import { Schema, model } from "mongoose";

const pesticides = Schema({
  pesticide_name: {
    type: String,
    required: true,
  },
  application_rate: {
    type: String,
    required: true,
  },
  pesticide_name: {
    type: String,
    required: true,
  },
  safety_caution: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
});

export default model("Pesticides", pesticides);
