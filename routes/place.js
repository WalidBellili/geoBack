const express = require("express");
const app = express();
const sequelize = require("sequelize");
const { Place } = require("../models");


// Cette route te permet de recuperer les positions
app.get("/place", async (req, res) => {
  const { name, latitude, longitude } = req.body;

  const point = {
    type: "Point",
    coordinates: [longitude, latitude],
  };
  const place = await Place.create({
    name,
    position: point,
  });
  res.json(place);
});

//  Cette route te permet de les recuperer
// en lmes recupérant sql va traiter le rayon

app.get("/place-perimeter", async (req, res) => {
  // /?rayonFacteur=0&latitude=0&longitude=0
//   http://localhost:5000/place-perimeter/?rayonFacteur=2&latitude=44&longitude=2&oorder=ASC
//   console.log(req.query);
  const { rayonFacteur, latitude, longitude } = req.query;

  const rayon = rayonFacteur * 1000;

  const location = sequelize.literal(
    `ST_GeomFromText('POINT(${longitude} ${latitude})')`
  );

  const distance = sequelize.fn(
    "ST_Distance_Sphere",
    sequelize.col("place.position"),
    location
  );

  const place = await Place.findAll({
    where: {
      position: sequelize.where(distance, { [sequelize.Op.lte]: rayon }),
    },
    order: [
        ['adresse', 'ASC'],
      ],
  });
  res.json(place);
});

module.exports = app;
