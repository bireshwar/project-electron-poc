const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const joinNodes = new Schema({
	userid: {
		type: String,
		required: true
	},
	mainMainNodes: {
		type: Intl,
		required: true
	},
	joinNodesSnippetFather: {
		type: String,
		required: false
	},
	joinNodesRelation: [{
		joinNodesSnippet: {
			type: String,
			required: false
		},
		title: {
			type: String,
			required: false
		},
		userPadre: {
			type: String,
			required: false
		},
		userid: {
			type: String,
			required: false
		},
		imageTitolare: {
			type: String,
			required: false
		},
		idgruppo: {
			type: String,
			required: false
		},
		mainNodes: {
			type: Intl,
			required: true
		}
	}]
});
module.exports = joinNodes;