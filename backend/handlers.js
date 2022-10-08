"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const signup = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("getDev");

    if (req.body.role === "student") {
      await db
        .collection("nondev-users")
        .insertOne({ ...req.body, _id: uuidv4(), appointments: [] });
    } else {
      await db.collection("devs").insertOne({
        ...req.body,
        _id: uuidv4(),
        appointments: [],
        availability: {
          Sunday: [],
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
        },
      });
    }

    res.status(200).json({ status: 200, message: "user signed in" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  } finally {
    client.close();
  }
};
const getDevs = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("getDev");

    const devs = await db.collection("devs").find().toArray();

    res.status(200).json({ status: 200, data: devs });
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  } finally {
    client.close();
  }
};
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const email = req.params.email;
    await client.connect();

    const db = client.db("getDev");

    const user = await db.collection("devs").findOne({ email });
    const nonDevUser = await db.collection("nondev-users").findOne({ email });
    console.log("nonedev", nonDevUser);

    if (user) {
      return res.status(200).json({ status: 200, user });
    }
    if (nonDevUser) {
      return res.status(200).json({ status: 200, nonDevUser });
    } else {
      return res.status(200).json({ status: 200, new: true });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  } finally {
    client.close();
  }
};

const getDev = async (req, res) => {
  const devId = req.params.devId;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("getDev");

    const user = await db.collection("devs").findOne({ _id: devId });
    res.status(200).json({ status: 200, data: user });
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
  } finally {
    client.close();
  }
};

const addAvailability = async (req, res) => {
  //we need email
  //we need the day
  //we need the time

  const client = new MongoClient(MONGO_URI, options);
  const email = req.body.email;
  const day = req.body.day;
  const time = parseInt(req.body.time);

  // try {
  await client.connect();

  const db = client.db("getDev");

  const user = await db.collection("devs").findOne({ email });

  if (user) {
    const daysAvailability = user.availability[day];

    if (daysAvailability) {
      if (daysAvailability.includes(time)) {
        res.status(409).json({ status: 409, message: "time already added" });
      } else {
        const path = `availability.${day}`;

        const pushResult = await db
          .collection("devs")
          .updateOne({ email }, { $push: { [path]: time } });
        if (pushResult.modifiedCount == 1) {
          res.status(200).json({ status: 200, message: "time added" });
        } else {
          res.status(500).json({ status: 500, message: "time not added" });
        }
      }
    } else {
      res.status(400).json({ status: 400, message: "invalid day" });
    }
  } else {
    res.status(404).json({ status: 404, message: "user not found" });
  }
  // } catch (err) {
  //   res.status(400).json({ status: 400, message: "something went wrong!" });
  //   console.log(err);
  // } finally {
  //   client.close();
  // }
};

const removeAvailability = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.body.email;
  const day = req.body.day;
  const time = parseInt(req.body.time);

  try {
    await client.connect();

    const db = client.db("getDev");

    const user = await db.collection("devs").findOne({ email });

    if (user) {
      const daysAvailability = user.availability[day];

      if (daysAvailability) {
        if (daysAvailability.includes(time)) {
          const path = `availability.${day}`;
          const pullResult = await db
            .collection("devs")
            .updateOne({ email }, { $pull: { [path]: time } });
          if (pullResult.modifiedCount == 1) {
            res.status(200).json({ status: 200, message: "time removed" });
          } else {
            console.log("here");
            res.status(500).json({ status: 500, message: "time not added" });
          }
        } else {
          res
            .status(409)
            .json({ status: 409, message: "time is already unavailable" });
        }
      } else {
        res.status(400).json({ status: 400, message: "invalid day" });
      }
    } else {
      res.status(404).json({ status: 404, message: "user not found" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  } finally {
    client.close();
  }
};
const addAppointment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { email, time, day } = req.body;
  //try {
  await client.connect();
  const sessionObj = { [day]: time };

  const db = client.db("getDev");

  const nonDev = await db.collection("nondev-users").findOne({ email });
  const updatedAppointments = nonDev.appointments.push(sessionObj);

  const newAppointments = { $push: { appointments: sessionObj } };

  await db.collection("nondev-users").updateOne({ email }, newAppointments);
  res.status(200).json({ status: 200, message: "booked" });
  // } catch (err) {
  //   res.status(400).json({ status: 200, message: "something went wrong" });
  // }
};

const removeAppointment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.body.email;
  const day = req.body.day;
  const time = parseInt(req.body.time);

  try {
    await client.connect();

    const db = client.db("getDev");

    const user = await db.collection("users").findOne({ email });

    if (user) {
      const daysAvailability = user.availability[day];

      if (daysAvailability) {
        if (daysAvailability.includes(time)) {
          const path = `availability.${day}`;
          const pullResult = await db
            .collection("users")
            .updateOne({ email }, { $pull: { [path]: time } });
          if (pullResult.modifiedCount == 1) {
            res.status(200).json({ status: 200, message: "time removed" });
          } else {
            res.status(500).json({ status: 500, message: "time not added" });
          }
        } else {
          res
            .status(409)
            .json({ status: 409, message: "time is already unavailable" });
        }
      } else {
        res.status(400).json({ status: 400, message: "invalid day" });
      }
    } else {
      res.status(404).json({ status: 404, message: "user not found" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  } finally {
    client.close();
  }
};

module.exports = {
  signup,
  getDevs,
  getDev,
  getUser,
  addAvailability,
  removeAvailability,
  addAppointment,
  removeAppointment,
};
