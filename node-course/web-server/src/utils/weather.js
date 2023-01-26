const request = require("request");
const dotenv = require("dotenv");

dotenv.config();

const weather = (lat, lon, callback) => {
  const latitude = encodeURIComponent(lat);
  const longitude = encodeURIComponent(lon);
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_KEY}&lat=${latitude}&lon=${longitude}&units=imperial`;

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services", undefined);
    } else if (body.message) {
      callback(body.message, undefined);
    } else {
      callback(undefined, {
        temp: body.main.temp,
        description: body.weather[0].description,
      });
    }
  });
};

module.exports = weather;
