require("dotenv").config({ path: "../.env" });


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

async function main() {

  await mongoose.connect(dbUrl);
  console.log("Connection successful");
}

main()
  .then(() => initDB())
  .catch((err) => console.log(err));

const initDB = async () => {
  try {
    await Listing.deleteMany({});

   initData.data = initData.data.map((obj) => ({
  ...obj,
  owner: "68467a9d37e61b42cbeccfa3",
  geometry: {
    type: "Point",
    coordinates: [77.2090, 28.6139]
  }
}));
    await Listing.insertMany(initData.data);

    console.log("Data was initialized");
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};