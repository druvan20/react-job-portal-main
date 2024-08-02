import mongoose from "mongoose"; // Import mongoose

// Database connection function
const dbConnection = async () => {
  try {
    // Connect to MongoDB with additional options
    await mongoose.connect(process.env.DB_URL, {
      dbName: "Job_Portal", // Specify the database name
      useNewUrlParser: true, // Avoid deprecation warnings for the URL parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    });
    console.log("MongoDB Connected"); // Log success message
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`); // Log error message
  }
};

export default dbConnection;
