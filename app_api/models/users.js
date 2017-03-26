var mongoose = require('mongoose');

// Users 
var usersSchema = new mongoose.Schema({
	///////////////////// for user in general //////////////////
	// google:{
	// 	id:{type: String},
	// 	token:{type: String},
	// 	email:{type: String},
	// 	name:{type: String}
	// }
	name: {type:String}
});

module.exports = mongoose.model ('users', usersSchema);