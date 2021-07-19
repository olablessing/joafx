const express = require("express");
const router = express.Router();
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

router.post("/pdf", (req, res, next) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const telephone = req.body.telephone;
	const message = req.body.message;

	var documentDefinition = {
		content: [
			{ text: "Transaction Statement", style: "header" },
			{
				style: "tableExample",
				color: "#444",
				table: {
					widths: [200, "auto"],
					headerRows: 2,
					// keepWithHeaderRows: 1,
					body: [
						[
							{
								text: "Sending Account Information",
								style: "tableHeader",
								colSpan: 2,
							},
							{},
						],
						[
							{
								text: "Account Holder Name",
								style: "tableHeader",
								alignment: "center",
							},
							{
								text: "Jonathan Oluwadara Adelakun",
								style: "tableHeader",
								alignment: "center",
							},
						],
						[
							{
								text: "Account Number / IBAN ",
								style: "tableHeader",
								alignment: "center",
							},
							{
								text: "Jonathan Oluwadara Adelakun",
								style: "tableHeader",
								alignment: "center",
							},
						],
						[
							{ text: "BIC/SWIFT", style: "tableHeader", alignment: "center" },
							{
								text: "Jonathan Oluwadara Adelakun",
								style: "tableHeader",
								alignment: "center",
							},
						],
					],
				},
			},

			{
				style: "tableExample",
				color: "#444",
				table: {
					widths: [200, "auto"],
					headerRows: 2,
					// keepWithHeaderRows: 1,
					body: [
						[
							{
								text: "Receiving Account Information",
								style: "tableHeader",
								colSpan: 2,
							},
							{},
						],
						[
							{
								text: "Account Holder Name",
								style: "tableHeader",
								alignment: "center",
							},
							{
								text: `${firstName} ${lastName}`,
								style: "tableHeader",
								alignment: "center",
							},
						],
						[
							{
								text: "Account Number / IBAN ",
								style: "tableHeader",
								alignment: "center",
							},
							{
								text: "Jonathan Oluwadara Adelakun",
								style: "tableHeader",
								alignment: "center",
							},
						],
						[
							{ text: "BIC/SWIFT", style: "tableHeader", alignment: "center" },
							{
								text: "Jonathan Oluwadara Adelakun",
								style: "tableHeader",
								alignment: "center",
							},
						],
					],
				},
			},

			{
				style: "tableExample",
				color: "#444",
				table: {
					widths: [200, "auto"],
					headerRows: 2,
					// keepWithHeaderRows: 1,
					body: [
						[
							{ text: "Transaction Details", style: "tableHeader", colSpan: 2 },
							{},
						],
						[
							{
								text: "Authorization Date",
								style: "tableHeader",
								alignment: "center",
							},
							{
								text: "Jonathan Oluwadara Adelakun",
								style: "tableHeader",
								alignment: "center",
							},
						],
						[
							{
								text: "Transaction Amount",
								style: "tableHeader",
								alignment: "center",
							},
							{
								text: `${firstName} ${lastName}`,
								style: "tableHeader",
								alignment: "center",
							},
						],
						[
							{
								text: "Recieved Amount",
								style: "tableHeader",
								alignment: "center",
							},
							{
								text: "Jonathan Oluwadara Adelakun",
								style: "tableHeader",
								alignment: "center",
							},
						],
						[
							{ text: "Reference", style: "tableHeader", alignment: "center" },
							{
								text: "Jonathan Oluwadara Adelakun",
								style: "tableHeader",
								alignment: "center",
							},
						],
					],
				},
			},
		],
	};

	const pdfDoc = pdfMake.createPdf(documentDefinition);

	pdfDoc.getBase64((data) => {
		res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-Disposition": 'attachment;filename="filename.pdf"',
		});
		const download = Buffer.from(data.toString("utf-8"), "base64");
		res.end(download);
	});
});

module.exports = router;
