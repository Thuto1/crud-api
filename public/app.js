// app.js

function carApp() {
  return {
      cars: [],
      newCar: { color: '', make: '', model: '', reg_number: '' },
      popularMake: '',

      // Fetch all cars
      fetchCars() {
          axios.get('http://localhost:3000/cars')
              .then(response => {
                  this.cars = response.data;
              })
              .catch(error => console.error(error));
      },

      // Add a new car
      addCar() {
          axios.post('http://localhost:3000/cars', this.newCar)
              .then(response => {
                  this.cars.push(response.data);
                  this.newCar = { color: '', make: '', model: '', reg_number: '' };
              })
              .catch(error => console.error(error));
      },

      // Edit a car
      editCar(car) {
          const updatedColor = prompt('Enter new color:', car.color);
          const updatedMake = prompt('Enter new make:', car.make);
          const updatedModel = prompt('Enter new model:', car.model);

          if (updatedColor && updatedMake && updatedModel) {
              axios.put(`http://localhost:3000/cars/${car.reg_number}`, {
                  color: updatedColor,
                  make: updatedMake,
                  model: updatedModel,
                  reg_number: car.reg_number
              })
                  .then(response => {
                      const index = this.cars.findIndex(c => c.reg_number === car.reg_number);
                      this.cars[index] = response.data;
                  })
                  .catch(error => console.error(error));
          }
      },

      // Delete a car
      deleteCar(reg_number) {
          axios.delete(`http://localhost:3000/cars/${reg_number}`)
              .then(() => {
                  this.cars = this.cars.filter(car => car.reg_number !== reg_number);
              })
              .catch(error => console.error(error));
      },

      // Get the most popular car make
      getMostPopularMake() {
          axios.get('http://localhost:3000/cars/popular-make')
              .then(response => {
                  this.popularMake = response.data.mostPopularMake;
              })
              .catch(error => console.error(error));
      },

      // Initialize the app by fetching cars
      init() {
          this.fetchCars();
      }
  }
}
document.addEventListener('alphine:init',()=>{
    Alphine.data('carData',carApp)
})