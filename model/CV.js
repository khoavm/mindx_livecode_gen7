const mongoose = require("../db/mongoose");

const { Schema } = mongoose;

const CVSchema = new Schema(
	{
		name: String,
		email: String,
		mobile: String,
		github: String,
		linkedIn: String,
		accountId: Schema.Types.ObjectId,
		summary: String,
		experiences: [
			{
				jobTitle: String,
				company: String,
				period: String,
				jobDescription: String,
			},
		],
		skills: [String],
		university: String,
		faculty: String,
		gpa: Number,
	},
	{ timestamps: true }
);

const CVModel = mongoose.model("CV", CVSchema);

module.exports = CVModel;
