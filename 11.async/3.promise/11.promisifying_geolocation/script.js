// Callback based geolocation
const getPosition = function () {
  navigator.geolocation.getCurrentPosition(
    pos => console.log(pos),
    err => console.error(err)
  );
};

// getPosition();

// PROMISIFYING
// Promise based geolocation
const getPosition2 = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition2()
  .then(pos => console.log('Promise Resolved: ', pos))
  .catch(err => console.error('Promise Rejected: ', err));
