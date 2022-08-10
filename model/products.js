const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
	{
		id: { type: Number},
		prodName: { type: String, required: true },
		category: { type: String, required: true },
		price: { type: Number, required: true },
		awailQuantity: { type: Number, required: true },
		img: { type: String, required: true },
		prodDescription: { type: String, required: true },
	},
	{
		collection: "products",
	}
);
const model = mongoose.model("productSchema", productSchema);
module.exports = model;
