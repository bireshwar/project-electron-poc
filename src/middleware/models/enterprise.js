const mongoose = require('mongoose');
const Schema = mongoose.Schema;
start = new Date(Date.now());
var ndate = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate(); //prints expected format.
const EnterpriseSchema = new Schema({
	dateToDay: {
		type: Date,
		default: Date.now()
	},
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	groupName: {
		type: String,
		required: true
	},
	idGruppo: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	useridPadre: {
		type: String,
		required: true

	},
	show: {
		type: Boolean,
		required: true
	},
	nome: {
		type: String,
		required: false
	},
	cognome: {
		type: String,
		required: false
	},
	publicationState: {
		type: String,
		required: true
	},
	idsnippet: {
		type: String,
		required: false
	},
	userid: {
		type: Array,
		require: false
	},
	useridPadreGroup: {
		type: String,
		required: false
	},
	descriptionUploadFile: {
		type: String,
		required: false
	},
	enterprise: {
		type: Schema.Types.ObjectId,
		ref: 'enterprise'
	}
});

module.exports = EnterpriseSchema;