const {Place} = require('./models')
const placesJson = require('./sanisettesparis.json')

const createPlaces = async () => {
    // console.log(places);
    await Place.destroy({where: {}})
    placesJson.forEach(async (place) => {
        const latitude = place.fields.geo_point_2d[0]
        const longitude = place.fields.geo_point_2d[1]

        const point = {
            type : 'Point',
            coordinates: [longitude, latitude]
        }
        const test = await Place.create({
            name: place.fields.adresse,
            position: point
        })
        console.log(test);
    })
}

createPlaces()