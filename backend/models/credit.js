var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var CreditSchema = new Schema({
    name : String,
    duration : Number,
    interest : Number,
    maximal : Number,
    isCorporate : Boolean
});
module.exports = mongoose.model('Credit', CreditSchema);