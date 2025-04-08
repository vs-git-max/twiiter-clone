import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectMongoDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo db connected ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error connecting with the database ${error}`);
    process.exit(1);
  }
};

export default connectMongoDb;
