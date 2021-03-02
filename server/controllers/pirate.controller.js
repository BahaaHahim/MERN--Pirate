const { response } = require('express');
const {Pirate} = require('../models/pirate.model')

module.exports.createPirate = (request, response) => {
    Pirate.create(request.body)
        .then(perfume => response.json(perfume))
        .catch(err => response.status(400).json(err));
}
module.exports.getAllPirates = (_request, response) => {
        Pirate.find({})
        .then(pirates => response.json(pirates))
        .catch(err => response.json(err))
}

module.exports.getAPirate = (request, response) => {
    Pirate.findById(request.params.id)
        .then(pirate => response.json(pirate))
        .catch(err => response.json(err))
}
module.exports.deletePirate = (request, response) => {
    Pirate.findByIdAndDelete(request.params.id)
    .then(() => response.json({status: 'success'}))
    .catch(err => response.json(err))
}



