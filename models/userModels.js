const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
name: {
    type: String,
    require: true
},
email: {
    type: String,
    require: true
},
age:{
    type: Number,
    require: true,
}
});

const userModels = mongoose.model("practiceusers",userSchema);
module.exports = userModels;