import axios from "axios";
import FuelConsumptionAPI from "./fuel-consumption-api.js";

const api = FuelConsumptionAPI()

export default function renderData() {
    
    //write a function that will render all cars
    async function allCars(req, res, next) {

        // call the API end-point to read the json
      const response = await axios.get("http://localhost:3000/api/vehicles");

        // convert json into easily readable data
        let cars = response.data
        let clientcars = cars.data

        // redner the data
        res.render("allcars", { clientcars });
    }

    // create a function that renders the add cars page
    async function addVehicles(req, res, next) {
        res.render("addcars")
    }

    // create a function that allows users to refuel cars
    async function refuelVehicles(req, res, next) {
        // create an end-point for the API

      const response = await axios.get("http://localhost:3000/api/vehicles");

        // convert the data into a simpler data type
      let cars = response.data;
      let clientcars = cars.data;

        // render the data
      res.render("refuelcars", { clientcars });
    }


    return {
      allCars,
      addVehicles,
      refuelVehicles,
    };
}