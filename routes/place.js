const express = require('express')
const app = express()
// const sequelize = require('sequelize')
const { Place } = require('../models')

app.get('/', async (req, res) => {
    const { name, latitude, longitude} = req.body

    const point = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }
    const place = await Place.create({
        name,
        position: point
    })
    res.json(place)
})

module.exports = app