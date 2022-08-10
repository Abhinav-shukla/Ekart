const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Product = require("./model/products");
const loginRouter = require("./Routes/loginRoutes");
const registerRouter = require("./Routes/registerRoutes");

mongoose.connect("mongodb://localhost:27017/mydatabase", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
//routes
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

//productCreation
app.post("/api/products", async (req, res) => {
	const {
		prodName: prodName,
		category: category,
		price: price,
		quantity: awailQuantity,
		imgUrl: img,
		desciption: prodDescription,
	} = req.body;

	try {
		const size = await Product.find().count();
		const tempId = size + 1;
		// console.log('db is:',size);
		const product = await Product.create({
			id: tempId,
			prodName,
			category,
			price,
			awailQuantity,
			img,
			prodDescription,
		});
		console.log("User created successfully: ", product);
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res
				.status(400)
				.json({ status: "error", message: "product already in use" });
		}
		throw error;
	}

	res
		.status(201)
		.json({ status: "ok", message: "product created successfully!" });
});

const port = 3000;
app.listen(port, "127.0.0.1", () => {
	console.log(`server is running at ${port}`);
});
