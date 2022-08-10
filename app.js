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

//product get request
app.get("/api/products", (req, res) => {
	Product.find({}, { _id: 0, __v: 0 }, function (err, prod) {
		if (err) {
			res.status(404).json({
				status: "error",
				message: "Can not find the data.",
			});
		}
		res.status(200).json({
			status: "ok",
			noOfProducts: prod.length,
			data: prod,
		});
	});
});

//productCreation
app.post("/api/products", async (req, res) => {
	const {
		displayName: displayName,
		shortDesc: shortDesc,
		desc: desc,
		category: category,
		price: price,
		discount: discount,
		offerPrice: offerPrice,
	} = req.body;

	try {
		const size = await Product.find().count();
		const tempId = size + 1;
		// console.log('db is:',size);
		const product = await Product.create({
			pid: tempId,
			displayName,
			shortDesc,
			desc,
			category,
			price,
			discount,
			offerPrice,
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

const port = 8047;
app.listen(port, "127.0.0.1", () => {
	console.log(`server is running at ${port}`);
});
