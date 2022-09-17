const _ = require("lodash");
const fs = require("fs");
const pdf = require("pdf-creator-node");
const createPDF = async (templateFilePath, data, path) => {
	try {
		const options = {
			format: "A4",
			orientation: "portrait",
			border: "0mm",
		};
		const templateContent = await fs.readFileSync(templateFilePath, "utf8");
		const template = _.template(templateContent);
		const html = await template(data).replace(/(\r\n|\n|\r)/gm, "");
		// console.log('html', JSON.stringify(html));
		const document = {
			html,
			data: {},
			path,
		};
		const pdfResult = await pdf.create(document, options);
		if (_.isEmpty(pdfResult)) {
			return null;
		}

		return pdfResult;
	} catch (error) {
		console.log("createPDF error: ");
		console.log(error);
		return null;
	}
};

module.exports = { createPDF };
