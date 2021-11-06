// contain most of the logic for fetching the data from each API endpoint.

const request = require('request');

const fetchMyIP = (callback, ip) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode}`;
      return callback(Error(msg), null);
    }
    ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};


const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const { latitude, longitude } = JSON.parse(body);
    console.log({ latitude, longitude });
    return callback(null, { latitude, longitude });

  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times.`;
      return msg;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
    //returns array
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(location, (error, passes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passes);
      });
    });
  });
};



module.exports = { nextISSTimesForMyLocation };