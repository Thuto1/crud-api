// main.js

function carManagementApp() {
  return {
    cars: [],
    newCar: {
      color: '',
      make: '',
      model: '',
      reg_number: '',
    },
    mostPopularCar: '',

    async fetchCars() {
      try {
        const response = await axios.get('/cars');
        this.cars = response.data;
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },

    async addCar() {
      try {
        await axios.post('/cars', this.newCar);
        this.fetchCars();
        this.newCar = {
          color: '',
          make: '',
          model: '',
          reg_number: '',
        };
      } catch (error) {
        console.error('Error adding car:', error);
      }
    },

    async deleteCar(reg_number) {
      try {
        await axios.delete(`/cars/${reg_number}`);
        this.fetchCars();
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    },

    async fetchMostPopularCar() {
      try {
        const response = await axios.get('/cars/popular-make');
        this.mostPopularCar = response.data.mostPopularMake;
      } catch (error) {
        console.error('Error fetching most popular car make:', error);
      }
    },

    async init() {
      this.fetchCars();
    },
  };
}
