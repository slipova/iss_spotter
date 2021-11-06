//It will require and run our main fetch function.

const { nextISSTimesForMyLocation } = require('./iss');


const printTimes = function(arrPasses) {
  let time = 0;
  let seconds = 0;
  for (let pass of arrPasses) {
    time = pass.risetime;
    seconds = pass.duration;
    console.log(`Next pass at ${time} GMT-0700 (Pacific Daylight Time) for ${seconds} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printTimes(passTimes);
});


// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log('ERROR', error);
//     return;
//   }
//   console.log("It worked. The coordinates are: ", coordinates);
// });

// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, responseArr) => {
//   if (error) {
//     console.log('ERROR', error);
//     return;
//   }
//   console.log("It worked! Passes: ", responseArr);
// });