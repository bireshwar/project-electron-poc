const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gruppiSchema = new Schema({
	delete: {
		type: Boolean,
		required: false,
		default: false
	},
	nomeGruppo: {
		type: String,
		required: true
	},
	partecipantiGruppo: {
		type: String,
		required: false
	},
	userid: {
		type: String,
		required: true
	},
	uGroup: {
		type: Array,
		required: true
	},
	uGroupTemporary: {
		type: Array,
		required: false
	},
	temporaryGroup: [{
		type: Object,
		required: false
	}],
	mail1: {
		type: String,
		required: false
	},
	image: {
		type: String,
		required: false
	},
	imageGroup: {
		type: String,
		required: false
	},
	nome: {
		type: String,
		required: false
	},
	cognome: {
		type: String,
		required: false
	},
	tipologia: {
		type: String,
		required: false
	},
	infoGruppo: {
		type: String,
		required: false
	},
	groupType: {
		type: String,
		required: false
	},
	visibility: {
		type: Boolean,
		required: false

	},
	useridGroup: [{
        type: Object,
        required: false,
        ref: 'Para'
    }]
})
module.exports = gruppiSchema;