const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Languages = new Schema({
	country: {
		type: String,
		required: false
	},
	private: {
		type: String,
		required: false
	},
	public: {
		type: String,
		required: false
	},
	howToLeave: {
		type: String,
		required: false
	},
	desktopApplication: {
		type: String,
		required: false
	},
	storeSnippet: {
		type: String,
		required: true
	},
	group: {
		type: String,
		required: false
	},
	lang: {
		type: String,
		required: false
	},
	goOut: {
		type: String,
		required: false
	},
	storeAnewSnippet: {
		type: String,
		required: false
	},
	text1: {
		type: String,
		required: false
	},
	text2: {
		type: String,
		required: false
	},
	text3: {
		type: String,
		required: false
	},
	text4: {
		type: String,
		required: false
	},
	text5: {
		type: String,
		required: false
	},
	text6: {
		type: String,
		required: false
	},
	here: {
		type: String,
		required: false
	},
	aws1Slogan: {
		type: String,
		required: false
	},
	aws2Slogan: {
		type: String,
		required: false
	},
	groupText1: {
		type: String,
		required: false
	},
	groupText2: {
		type: String,
		required: false
	},
	groupText3: {
		type: String,
		required: false
	},
	groupList: {
		type: String,
		required: false
	},
	text1Slogan: {
		type: String,
		required: false
	},
	languages: {
		type: Schema.Types.ObjectId,
		ref: 'languages'
	}
})
module.exports = Languages;