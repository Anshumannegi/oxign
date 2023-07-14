import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected succesfully");
    });
    connection.on("error", (err) => {
      console.log("mongodb error", err);
       process.exit();
    });
  } catch (error) {
    console.log("erro connectiong mongoose", error);
  }
}
