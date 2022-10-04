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

// returns an array of all flight numbers
const signup = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("getDev");

    if (req.body.role === "student") {
      await db.collection("nondev-users").insertOne(req.body);
    } else {
      await db.collection("users").insertOne(req.body);
    }

    res.status(200).json({ status: 200, message: "user signed in" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  }
};
const getDevs = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("getDev");

    const devs = await db.collection("users").find().toArray();

    res.status(200).json({ status: 200, data: devs });
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong!" });
    console.log(err);
  }
};

module.exports = {
  signup,
  getDevs,
};
