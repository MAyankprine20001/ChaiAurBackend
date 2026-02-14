import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config();

connectDB()
  .then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port : ${process.env.PORT}`);
    });
    server.on("error", (error) => {
      console.error("Server failed to start", error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.log("MONGODB Connection failed !!!!", error);
  });
