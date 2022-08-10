const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
	{
		pid: { type: Number },
		displayName: { type: String, required: true },
		shortDesc: { type: String, required: true },
		desc: { type: String, required: true },
		category: { type: String, required: true },
		price: { type: Number, required: true },
		discount: { type: Number, required: true },
		offerPrice: { type: Number, required: true },
	},
	{
		collection: "products",
	}
);
const model = mongoose.model("productSchema", productSchema);
module.exports = model;
