import mongoose from "mongoose";

export async function connect(){
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected",()=> {
      console.log("mongo db connected successfully")
    })
    
    connection.on("error", (err)=> {
      console.log("not connected with mongo db"+ err);
      process.exit(1);
      
    })
  } catch (error) {
    console.log("network not connected")
    console.log(error);
    process.exit(1);
  }
}

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config(); // Load .env variables

// const MONGODB_URI = process.env.MONGO_URI;
// console.log(MONGODB_URI);

// if (!MONGODB_URI) {
//   throw new Error("MONGO_URI is not defined in the .env file");
// }

// export const connect = async () => {
//   try {
//     if (mongoose.connection.readyState >= 1) {
//       console.log("Already connected to MongoDB");
//       return;
//     }
//     await mongoose.connect(MONGODB_URI);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw new Error("Failed to connect to MongoDB");
//   }
// };


