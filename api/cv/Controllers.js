const UserModel = require("../../model/User");
const CVModel = require("../../model/CV");
const RESPONSE_CODE = require("../../constants/ResponseCode");
const bcrypt = require("bcrypt");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../../config/dev").JWT_SECRET.TEST;
const path = require("path");
const fs = require("fs");
const PDFUtilService = require("../../utils/pdf");
module.exports = {
	createCV: async (req, res) => {
		try {
			const {
				name,
				email,
				mobile,
				github,
				linkedIn,
				summary,
				experiences,
				skills,
				university,
				faculty,
				gpa,
			} = req.body;
			const userId = Mongoose.Types.ObjectId(req.user.id);
			const cv = await CVModel.create({
				name,
				email,
				mobile,
				github,
				linkedIn,
				summary,
				experiences,
				skills,
				university,
				faculty,
				gpa,
				accountId: userId,
			});
			if (!cv) {
				return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: req.t("SERVER_ERROR") });
			}

			return res.send({
				message: "create cv sucessfully",
			});
		} catch (error) {
			console.log(error);
			return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: error.message });
		}
	},
	downloadCV: async (req, res) => {
		const templateFilePath = path.resolve("./cv_template.html");
		const cvId = req.query.cvId;

		const existedCV = await CVModel.findOne({ _id: Mongoose.Types.ObjectId(cvId) });
		if (!existedCV) {
			return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: "not found cv" });
		} else {
			const foundUserId = existedCV.accountId;
			const userId = req.user.id;
			const isdAdmin = req.user.isAdmin;
			if (foundUserId != userId && !isdAdmin) {
				return res
					.status(RESPONSE_CODE.UNAUTHORIZED)
					.send({ message: "user don't have permission" });
			}
		}
		const data = {
			name: existedCV.name,
			email: existedCV.email,
			mobile: existedCV.mobile,
			github: existedCV.github,
			linkedIn: existedCV.linkedIn,

			summary: existedCV.summary,
			experiences: existedCV.experiences,
			skills: existedCV.skills,
			university: existedCV.university,
			faculty: existedCV.faculty,
			gpa: existedCV.gpa,
		};

		const fileNameReceive = `${cvId}.pdf`;
		const pdfResult = await PDFUtilService.createPDF(
			templateFilePath,
			data,
			`./${fileNameReceive}`
		);
		if (pdfResult === null) {
			return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: "create pdf failed" });
		}

		const buff = fs.readFileSync(pdfResult.filename);
		const binaryData = buff.toString("binary");
		try {
			fs.unlinkSync(`${pdfResult.filename}`);
		} catch (error) {
			console.log("fs error", JSON.stringify(error));
		}
		res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-disposition": "attachment;filename=" + fileNameReceive,
			"Content-Length": binaryData.length,
		});
		res.end(Buffer.from(binaryData, "binary"));
	},
	fetchCVs: async (req, res) => {
		const userId = Mongoose.Types.ObjectId(req.user.id);
		const isAdmin = req.user.isAdmin;
		const query = {};
		if (!isAdmin) {
			query["accountId"] = userId;
		}
		const cvList = await CVModel.find(query);
		return res.send({
			data: cvList,
		});
	},
	fetchCV: async (req, res) => {
		//const userId = Mongoose.Types.ObjectId(req.user.id);
		const cvId = Mongoose.Types.ObjectId(req.query.cvId);

		const cvInfo = await CVModel.findOne({ _id: cvId });
		if (!cvInfo) {
			return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: "not found cv" });
		} else {
			const foundUserId = existedCV.accountId;
			const userId = req.user.id;
			const isdAdmin = req.user.isAdmin;
			if (foundUserId != userId && !isdAdmin) {
				return res
					.status(RESPONSE_CODE.UNAUTHORIZED)
					.send({ message: "user don't have permission" });
			}
		}
		return res.send({
			data: cvInfo,
		});
	},
	updateCv: async (req, res) => {
		try {
			const {
				name,
				email,
				mobile,
				github,
				linkedIn,
				summary,
				experiences,
				skills,
				university,
				faculty,
				gpa,
			} = req.body;

			const cvId = Mongoose.Types.ObjectId(req.query.cvId);
			const cvInfo = await CVModel.findOne({ _id: cvId });
			if (!cvInfo) {
				return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: "not found cv" });
			} else {
				const foundUserId = cvInfo.accountId;
				const userId = req.user.id;
				const isAdmin = req.user.isAdmin;
				if (foundUserId != userId && !isAdmin) {
					return res
						.status(RESPONSE_CODE.UNAUTHORIZED)
						.send({ message: "user don't have permission" });
				}
			}
			await CVModel.updateOne(
				{ _id: cvId },
				{
					name,
					email,
					mobile,
					github,
					linkedIn,
					summary,
					experiences,
					skills,
					university,
					faculty,
					gpa,
				}
			);

			return res.send({
				message: "update cv sucessfully",
			});
		} catch (error) {
			console.log(error);
			return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: error.message });
		}
	},
	deleteCv: async (req, res) => {
		try {
			const cvId = Mongoose.Types.ObjectId(req.query.cvId);
			const cvInfo = await CVModel.findOne({ _id: cvId });
			if (!cvInfo) {
				return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: "not found cv" });
			} else {
				const foundUserId = existedCV.accountId;
				const userId = req.user.id;
				const isdAdmin = req.user.isAdmin;
				if (foundUserId != userId && !isdAdmin) {
					return res
						.status(RESPONSE_CODE.UNAUTHORIZED)
						.send({ message: "user don't have permission" });
				}
			}
			await CVModel.deleteOne({ _id: cvId });

			return res.send({
				message: "delete cv sucessfully",
			});
		} catch (error) {
			console.log(error);
			return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: error.message });
		}
	},
};
