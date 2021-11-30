import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Successfully Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`DB-Error:${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
