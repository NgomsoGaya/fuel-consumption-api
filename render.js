import axios from "axios";
import FuelConsumptionAPI from "./fuel-consumption-api.js";

const api = FuelConsumptionAPI()

export default function renderData() {
    
    async function allCars(req, res, next) {
      const response = await axios.get("http://localhost:3000/api/vehicles");

        let cars = response.data
        let clientcars = cars.data

        res.render("allcars", { clientcars });
    }

    async function addVehicles(req, res, next) {
        res.render("addcars")
    }

    async function refuelVehicles(req, res, next) {
        const response = await axios.get("http://localhost:3000/api/vehicles");

        let cars = response.data;
        let clientcars = cars.data;

        res.render("refuelcars", { clientcars });
    }

    async function addCar(req, res, next) {
        const response = await axios.get("http://localhost:3000/api/vehicle");

        let data = response.data
        if (data.status == "success") {
            res.redirect("/addcars")
        } 
    }

    return {
      allCars,
      addVehicles,
      refuelVehicles,
      addCar,
    };
}