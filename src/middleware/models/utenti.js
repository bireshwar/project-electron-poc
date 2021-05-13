const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UtentiSchema = new Schema({
	url: {
		type: String
	},
	country: {
		type: String
	},
	languages: {
		type: String
	},
	userInvitation: {
		type: String,
		required: false,
	},
	userGroupInvitation: {
		type: String,
		required: false,
	},
	dateBirth: {
		type: String,
		required: false,
	},
	countryLive: {
		type: String,
		required: false,
	},
	cityLive: {
		type: String,
		required: false,
	},
	companyType: {
		type: String,
		required: false,
	},
	companyName: {
		type: String,
		required: false,
	},
	companyAddress: {
		type: String,
		required: false,
	},
	vat: {
		type: String,
		required: false,
	},
	fiscalCode: {
		type: String,
		required: false
	},
	sdiCode: {
		type: String,
		required: false,
	},
	countSnippets: {
		type: Intl,
		required: false,
		default: 0
	},
	countGroup: {
		type: Intl,
		required: false,
		default: 0
	},
	countSize: {
		type: Number,
		required: false,
		default: 0
	},
	countSizeDownload: {
		type: Number,
		required: false,
		default: 0
	},
	enterpriseGroup: {
		type: Number,
		required: true,
		default: 0
	},
	nome: {
		type: String,
		required: true
	},
	cognome: {
		type: String,
		required: true
	},
	job: {
		type: Object,
		required: false
	},
	skills: {
		type: Array,
		required: false
	},
	email: {
		type: String,
		required: true
	},
	emailCommunications: {
		type: String,
		required: true
	},
	cellulare: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: false
	},
	data: {
		type: Date,
		default: Date.now
	},
	image: {
		type: String,
		required: false
	},
	resetPasswordToken: {
		type: String,
		required: false
	},
	resetPasswordExpires: {
		type: Date,
		default: Date
	},
	sizeAvailable: {
		type: Number,
		required: true
	},
	fbid: {
		type: String
	},
	amazonid: {
		type: String
	},
	snippetAvailable: {
		type: Number,
		required: true
	},
	expPayment: {
		type: Date
	},
	lastamount: {
		type: Number
	},
	AmazonBillingAgreementId: {
		type: String
	},
	talkMe: {
		type: String
	},
	gruppi: {
		type: Schema.Types.ObjectId,
		ref: 'gruppi'
	}
})
module.exports = UtentiSchema;