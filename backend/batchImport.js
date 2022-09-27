const { flights, reservations } = require("./data.js");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  //   // TODO: create client
  // console.log(flights)

  const flightIds = Object.keys(flights);

  const flightsToInsert = flightIds.map((flightId) => {
    return {
      flight: flightId,
      seats: flights[flightId],
    };
  });

  const client = new MongoClient(MONGO_URI, options);
  try {
    //     // TODO: connect...
    await client.connect();
    //     // TODO: declare 'db'
    const db = client.db("slingair");
    //     // We are using the 'exercises' database
    //     // and creating a new collection 'greetings'
    // const insertion = await db
    // .collection("flights")
    //.insertMany(flightsToInsert);
    const insertion = await db
      .collection("reservation")
      .insertMany(reservations);
    // res.status(201).json({ status: 201, data: req.body });
    console.log("insertMany(flights)");
  } catch (err) {
    // res.status(500).json({ status: 500, data: req.body, message: err.stack});
    console.log(err);
  }
  client.close();
  //   // TODO: close client
};

batchImport();
