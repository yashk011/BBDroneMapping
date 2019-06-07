var mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise; // set upto use Promises  
//mongoose.connect('mongodb://localhost:27017/bank_data');
mongoose.connect(keys.mongoURI);

module.exports = {mongoose};