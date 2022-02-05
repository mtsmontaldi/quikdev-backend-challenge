const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    id: Number,
    name: String,
    username: String, 
    birthdate: String, 
    address: String, 
    addressNumber: Number, 
    primaryPhone: String, 
    approved: Boolean,
    description: String,
    createdAt: Date
})

module.exports = Person
