// Install EJS, Express, and MongoDB in Terminal

const express = require("express");
const req = require("express/lib/request");
const mongoose = require("mongoose");

const app = express();
app.use(express.static(__dirname+ "/public"))

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.set("view engine", "ejs");

app.use(express.json());

const countrySchema = new mongoose.Schema({
  country: { type: String },
  flagURL: { type: String },
  population: { type: Number },
  officialLanguage: { type: String },
  hasNuclearWeapons: { type: Boolean },
});

const Country = mongoose.model("Country", countrySchema, "Countries");

// Create a POST route for "/add/country" that adds a country using the request body (3 points)
// Use postman to add at least THREE different countries
app.post("/add/country", async (req, res)=>{
    const addCountry= await new Country({
      country: req.body.country,
      population: req.body.population,
      hasNuclearWeapons:req.body.hasNuclearWeapons,
      flagURL: req.body.flagURL,
      officialLanguage: req.body.officialLanguage
       }).save()
   
    res.json(addCountry);
    })


// Create a GET route for "/" that renders countries.ejs with every country from the Countries collection (1 point)
app.get("/", async (req, res)=>{
 const countries= await Country.find({})
  res.render("countries.ejs", {countries});

  })

// Go to countries.ejs and follow the tasks there (2 points)


// Create a dynamic PATCH route handler for "/update/{name}" that modifies the population of the country specified in the path (3 points)
// Test this route on post man
app.patch("/country/:name", async, (req, res)=>{
   const res= await counrty.findOneAndUpdate

   name: req.params.name
   })

// Create a DELETE route handler for "/delete/country" that deletes a country of your choice (3 points)
// Test this route on post man
 app.delete("/country/:name", async, (req, res)=>{
const res= await counrty.findOneAndDelete
name: req.params.name
 res.json(res);
 })

async function startServer() {
  
    // add your SRV string with a database called countries
  await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.2yqbx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

  app.listen(3000, () => {
    console.log("Server is running");
  });
}

startServer();
