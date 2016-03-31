var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Movies = new Schema({
    Title: {type: String},
    Runtime: {type: String},
    Rated: {type: String},
    Actors: {type: String},
    Plot: {type: String}
});
module.exports = mongoose.model("Movies", Movies);
