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

const port = 3000;
app.listen(port, "127.0.0.1", () => {
	console.log(`server is running at ${port}`);
});
