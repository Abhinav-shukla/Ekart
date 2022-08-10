const User = require("./../model/user");

exports.registerUser = async (req, res) => {
	const {
		name: uname,
		emailId: uemail,
		phoneNumber: phoneNumber,
		password: plainTextPassword,
	} = req.body;
	// const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
	// console.log(req.body);
	// console.log(uname, uemail, plainTextPassword);
	if (!uemail || typeof uemail !== "string") {
		return res.status(400).json({ status: "error", message: "Invalid Email" });
	}

	if (!plainTextPassword || typeof plainTextPassword !== "string") {
		return res
			.status(400)
			.json({ status: "error", message: "Invalid password" });
	}

	if (plainTextPassword.length < 3) {
		return res.json({
			status: "error",
			message: "Password too small. Should be atleast 4 characters",
		});
	}

	// const upassword = await bcrypt.hash(plainTextPassword, 10);
	const upassword = plainTextPassword;

	try {
		const res = await User.create({
			uname,
			uemail,
			phoneNumber,
			upassword,
		});
		console.log("User created successfully: ", res);
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res
				.status(400)
				.json({ status: "error", message: "uemail already in use" });
		}
		throw error;
	}

	res.status(201).json({ status: "ok", message: "user created successfully!" });
}