var mongoose = require('mongoose');

var Bank = mongoose.model('Bank'  , {
    bank_name : {
            type: String,
            required : true,
            minlength : 1,
            trim : true ,
    },
    branch_name : {
            type : String ,
    },
    ifsc_code : {
            type : String,
    },
    city :{
            type : String,
    }
})


module.exports = {Bank};