var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Villains = new Schema({
    Name: {type: String},
    Power: {type: String},
    Foe: {type: String},
    Weakness: {type: String},
    Image: {type: String}
});
module.exports = mongoose.model("Villains", Villains);
