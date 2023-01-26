const request = require("request");
const dotenv = require("dotenv");

dotenv.config();

const geocode = (location, cb) => {
  const url = `https://us1.locationiq.com/v1/search.php/?key=${process.env.GEOCODE_KEY}&q=${location}&format=json`;
  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      cb("Unable to connect to network", undefined);
    } else if (body.error) {
      cb(body.error, undefined);
    } else {
      cb(undefined, {
        lat: body[0].lat,
        lon: body[0].lon,
        location: body[0].display_name,
      });
    }
  });
};

module.exports = geocode;
