import express from 'express';
import cors from 'cors';
import carData from './carData.js'; // Note the .js extension

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let cars = carData;

// Helper function to find the most popular car make
function mostPopularCar() {
  const makeCount = {};
  cars.forEach(car => {
    makeCount[car.make] = (makeCount[car.make] || 0) + 1;
  });
  let mostPopular = '';
  let maxCount = 0;
  for (const make in makeCount) {
    if (makeCount[make] > maxCount) {
      maxCount = makeCount[make];
      mostPopular = make;
    }
  }
  return mostPopular;
}

// Routes
app.get('/cars', (req, res) => {
  res.json(cars);
});

app.post('/cars', (req, res) => {
  const newCar = req.body;
  cars.push(newCar);
  res.status(201).json(newCar);
});

app.delete('/cars/:reg_number', (req, res) => {
  const regNumber = req.params.reg_number;
  cars = cars.filter(car => car.reg_number !== regNumber);
  res.status(204).end();
});

app.get('/cars/popular-make', (req, res) => {
  const popularMake = mostPopularCar();
  res.json({ mostPopularMake: popularMake });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
