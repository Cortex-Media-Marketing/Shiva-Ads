const crypto = require('crypto');
let algorithm = 'aes-256-ctr';
let password = 'StCaErRaZaBnIoK2122TOSCD1S2N3A4E';
let iv = 'K102I3n4aZbYCxDw';
const otpGenerator = require('otp-generator')

module.exports = {
	encrypt: function (value) {
		let cipher = crypto.createCipheriv(algorithm, password, iv);
		let crypted = cipher.update(value, 'utf8', 'hex')
		crypted += cipher.final('hex');
		return crypted;
	},
	decrypt: function (value) {
		let decipher = crypto.createDecipheriv(algorithm, password, iv)
		let dec = decipher.update(value, 'hex', 'utf8')
		dec += decipher.final('utf8');
		return dec;
	},
	GeneratePassword: (digit) => {
		return otpGenerator.generate(digit, { digits: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, specialChars: true });
	},
	ReplacePlaceholders: (text, data) => {
		const placeholderRegex = /\\?\${([\w\d]+)}/g;

		const replacedText = text.replace(placeholderRegex, (match, key) => {
			return data[key] || match;
		});

		return replacedText;
	},
	UpdateTemplate: (template, data) => {

		const textToReplace = template.body;

		const replacedText = module.exports.ReplacePlaceholders(textToReplace, data);

		template.body = replacedText;

		return template;
	},

	
	GenerateRoNumber: async() => {
		const RoNumberModel = require('../models/roNumber');
	      let getExRoNumber = await RoNumberModel.find({},{},{roNumber :-1})
		  if(getExRoNumber && getExRoNumber.roNumber != 0 && getExRoNumber.length!=0 ){
			return getExRoNumber[0].roNumber +1;
		  }
			let newRoNumber = await RoNumberModel.create({roNumber :100000000})
		  console.log(newRoNumber,"newRoNumber")
		return newRoNumber.roNumber 
	},
	GenerateNewRoNumber: async () => {
		try {
			const RoNumberModel = require('../models/roNumber');
			let getExRoNumber = await RoNumberModel.findOne({}, null, { sort: { roNumber: -1 } });
			if (getExRoNumber && getExRoNumber.roNumber !== 0) {
				let genRoNo =  getExRoNumber.roNumber + 1;
				getExRoNumber.roNumber = genRoNo
				getExRoNumber.save()
				return getExRoNumber.roNumber
			}
			let newRoNumberDocument = await RoNumberModel.create({ roNumber: 100000000 });
			let newRoNumber = newRoNumberDocument.roNumber; // Extract the roNumber value from the created document
			console.log(newRoNumber, "newRoNumber");
			return newRoNumber;
		} catch (error) {
			console.error("Error in GenerateRoNumber:", error);
			throw error; // Re-throw the error to propagate it upwards
		}
	},
	
	IncRoNumber: async () => {
		const RoNumberModel = require('../models/roNumber');
		let getExRoNumber = await RoNumberModel.find({}, {}, { roNumber: -1 })
		if (getExRoNumber && getExRoNumber.roNumber != 0 && getExRoNumber.length != 0) {
			const id = getExRoNumber[0]._id;
			let updateRoNum = await RoNumberModel.updateOne({ _id: id }, { roNumber: getExRoNumber[0].roNumber + 1 }, { roNumber: -1 })
			return updateRoNum;
		}
		let newRoNumber = await RoNumberModel.create({ roNumber: 100000000 })
		return newRoNumber.roNumber
	},

};

