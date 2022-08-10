const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
	{
		uname: { type: String, required: true},
        uemail:{type: String, required: true, unique: true},
		phoneNumber:{type:Number, required:true, unique:true},
		upassword: { type: String, required: true },
	},
	{ collection: "users" }
);

const model = mongoose.model("UserSchema", UserSchema);
module.exports = model;
