const mongoose = require('mongoose');

const EmpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: { 
        type: Number, 
        required: true 
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
}, {
    timestamps: true,
    versionKey: false
})


const EmpModel = new mongoose.model('csvexport-data', EmpSchema);

module.exports = EmpModel;


