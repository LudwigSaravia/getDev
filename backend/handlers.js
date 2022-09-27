"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
const { reservations } = require("./data");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns an array of all flight numbers
const getFlights = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("slingair");

    const allFlightNumbers = await db.collection("flights").find().toArray();
    const result = [];
    allFlightNumbers.forEach((flight) => {
      result.push(flight.flight);
    });
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  }
};

// returns all the seats on a specified flight
const getFlight = async (req, res) => {
  const flight = req.params.flight;
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("slingair");

    const singleFlight = await db
      .collection("flights")
      .findOne({ flight: flight });
    console.log(singleFlight);

    singleFlight
      ? res.status(200).json({ status: 200, data: singleFlight.seats })
      : res.status(404).json({ status: 404, message: "flight not found" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  }
};

// returns all reservations
const getReservations = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("slingair");

    const allReservations = await db.collection("reservation").find().toArray();

    res.status(200).json({ status: 200, data: allReservations });
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  }
};

// returns a single reservation
const getSingleReservation = async (req, res) => {
  const reservation = req.params.reservation;
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("slingair");

    const singleReservation = await db
      .collection("reservation")
      .findOne({ id: reservation });

    singleReservation
      ? res.status(200).json({ status: 200, data: singleReservation })
      : res.status(404).json({ status: 404, message: "reservation not found" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  }
};

// creates a new reservation
const addReservation = async (req, res) => {
  try {
    let seatAvailable = false;
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("slingair");

    const singleFlight = await db
      .collection("flights")
      .findOne({ flight: req.body.flight });

    singleFlight.seats.forEach((seat) => {
      if (seat.id === req.body.seat && seat.isAvailable) {
        seatAvailable = true;
      }
    });

    //update seat

    if (seatAvailable) {
      singleFlight.seats.forEach((seat) => {
        if (seat.id === req.body.seat) {
          seat.isAvailable = false;
        }
      });

      const query = { flight: req.body.flight };
      await db
        .collection("flights")
        .updateOne(query, { $set: { seats: singleFlight.seats } });

      const reservationObject = { ...req.body, id: uuidv4() };
      await db.collection("reservation").insertOne(reservationObject);
      return res
        .status(200)
        .json({
          status: 200,
          message: "seat is reserved",
          data: reservationObject,
        });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "seat is not available" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  }
};

// updates a specified reservation
const updateReservation = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("slingair");
    const reservationId = req.body.id;
    const { flight, seat, surname, givenName, email } = req.body;

    const oldReservation = await db
      .collection("reservation")
      .findOne({ id: reservationId });

    const { seat: oldSeat, flight: oldFlight } = oldReservation;

    const queryObj = { id: reservationId };

    const updateObj = {
      $set: {
        seat: seat, // this will update
        flight: flight,
        surname: surname,
        givenName: givenName,
        email: email,
      },
    };

    const updateResult = await db
      .collection("reservation")
      .updateOne(queryObj, updateObj);
    //   update the reservation in the reservation collection
    // update the seats in the flight collectioon

    const oldFlightData = await db
      .collection("flights")
      .findOne({ flight: oldFlight });
    oldFlightData.seats.forEach((seat) => {
      // if the seat id is the same as the old seat change the availability from false to true
      if (seat.id === oldSeat) {
        seat.isAvailable = true;
      }
    });
    await db
      .collection("flights")
      .updateOne({ flight: oldFlight }, { $set: oldFlightData });

    const newFlightData = await db
      .collection("flights")
      .findOne({ flight: flight });

    console.log(newFlightData);

    newFlightData.seats.forEach((seat) => {
      if (seat.id === req.body.seat) {
        seat.isAvailable = false;
      }
    });
    const result = await db
      .collection("flights")
      .updateOne({ flight: flight }, { $set: newFlightData });
    console.log(result);

    // return a reponse to the requester
    return res
      .status(200)
      .json({ status: 200, data: req.body, message: "update success!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, message: "something went wrong!" });
  }
};

// deletes a specified reservation
const deleteReservation = async (req, res) => {
  try {
    const reservation = req.params.reservation;
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("slingair");

    const existingReservation = await db
      .collection("reservation")
      .findOne({ id: reservation });

    const singleFlight = await db
      .collection("flights")
      .findOne({ flight: existingReservation.flight });

    singleFlight.seats.forEach((seat) => {
      if (seat.id === existingReservation.seat) {
        seat.isAvailable = true;
      }
    });

    const query = { flight: existingReservation.flight };
    await db
      .collection("flights")
      .updateOne(query, { $set: { seats: singleFlight.seats } });

    await db.collection("reservation").deleteOne({ id: reservation });
    return res
      .status(200)
      .json({ status: 200, message: "reservation is deleted" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
