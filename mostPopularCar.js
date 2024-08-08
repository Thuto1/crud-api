// utils.js

function mostPopularCar(carData) {
  const makeCount = {};

  carData.forEach((car) => {
    makeCount[car.make] = (makeCount[car.make] || 0) + 1;
  });

  let mostPopular = '';
  let maxCount = 0;

  for (const make in makeCount) {
    if (makeCount[make] > maxCount) {
      mostPopular = make;
      maxCount = makeCount[make];
    }
  }

  return mostPopular;
}

module.exports = {
  mostPopularCar, // Export the function
};
