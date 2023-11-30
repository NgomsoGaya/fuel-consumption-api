import pgPromise from 'pg-promise';
import express from 'express';
import exphbs from "express-handlebars";
import "dotenv/config"
import bodyParser from 'body-parser';

import FuelConsumption from './fuel-consumption.js';
import FuelConsumptionAPI from './fuel-consumption-api.js';
import renderData from './render.js';

const pgp = pgPromise();

const connectionOptions = {
    connectionString: process.env.DATABASE_URL || 'postgres://fuel:fuel@localhost:5432/fuel_consumption',
    ssl: process.env.NODE_ENV === 'production', // Enable SSL in production
};

const db = pgp(connectionOptions);

const fuelConsumption = FuelConsumption(db);
const fuelConsumptionAPI = FuelConsumptionAPI(fuelConsumption)
const renderdata = renderData()

//setting up the Express application with Handlebars as the view engine. Handlebars templates are expected to be located in the views directory, and i've also configured partialsDir and layoutsDir.
const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts",
});

const app = express();

//Setting Up Handlebars as the View Engine:
app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");

//Configuring the Views Directory:
app.set("views", "./views");

//Serving Static Files:
app.use(express.static("public"));

//first line is for parsing URL-encoded form data, and the second line is for parsing JSON data. The extended: true option allows for parsing nested objects.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", renderdata.allCars);
app.get('/addcars', renderdata.addVehicles)
app.post('/addcars', fuelConsumptionAPI.addVehicle)
app.get('/refuel', renderdata.refuelVehicles)
app.post("/refuel", fuelConsumptionAPI.refuel);

app.get('/api/vehicles', fuelConsumptionAPI.vehicles);
app.get('/api/vehicle', fuelConsumptionAPI.vehicle);
app.post('/api/vehicle', fuelConsumptionAPI.addVehicle);
app.post('/api/refuel', fuelConsumptionAPI.refuel);

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

