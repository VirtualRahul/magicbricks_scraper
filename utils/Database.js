import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(`mongodb+srv://rahul2:iEbZadthsVpu2wJ4@cluster0.7rklrwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      dbName: 'magicbriks_scraper',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
  } catch (error) {
    console.error(error);
  }
};
