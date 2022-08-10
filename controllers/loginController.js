const User = require("./../model/user");
const jwt = require("jsonwebtoken");
const secretKey = "dafsdkfjalsdjlfksakldjf@@#dfafdaasdasd$%@$@kdsafjlaa";
exports.loginUser = async (req, res) => {
	const { email: uemail, password } = req.body;
	// console.log(uemail, password);
	const user = await User.findOne({ uemail }).lean();
	// console.log(user);
	if (!user) {
		return res
			.status(404)
			.json({ status: "error", message: "Invalid Username/password" });
	}

	if (password === user.upassword) {
		// the uemail, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				uname: user.uname,
				uemail: user.uemail,
			},
			secretKey
		);

		return res.status(200).json({
			status: "ok",
			message: "Logged in successfully",
			data: { token },
		});
	}

	res
		.status(404)
		.json({ status: "error", message: "Invalid username/password" });
};
