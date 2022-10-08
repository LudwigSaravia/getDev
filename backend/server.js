"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
  signup,
  getDevs,
  getDev,
  getUser,
  addAvailability,
  removeAvailability,
  addAppointment,
  removeAppointment,
} = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------

  .post("/api/signup", signup)
  .get("/api/getUser/:email", getUser)
  .get("/api/getDev/:devId", getDev)
  .get("/api/get-devs", getDevs)
  //
  .patch("/api/add-availability", addAvailability)
  .patch("/api/remove-availability", removeAvailability)
  //
  .patch("/api/add-appointment", addAppointment)
  .patch("/api/remove-appointment", removeAppointment)

  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
