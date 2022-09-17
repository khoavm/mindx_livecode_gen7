const mongoose = require("../db/mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		fullName: String,
		email: String,
		password: String,
		isOnline: Boolean,
		isAdmin: Boolean,
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
