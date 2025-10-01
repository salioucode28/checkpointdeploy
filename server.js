import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import serverless from "@vendia/serverless-express";
import User from "./models/user.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connexion MongoDB avec cache global
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI manquante");
    throw new Error("MONGO_URI manquante");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "restapi",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connecté");
  } catch (err) {
    console.error("❌ Erreur MongoDB:", err);
    throw err;
  }
}

/* ----------- ROUTES ----------- */

app.get("/api/users", async (req, res) => {
  try {
    await connectDB();
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    await connectDB();
    const newUser = await User.create(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    await connectDB();
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: deletedUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/* ----------- EXPORT SERVERLESS ----------- */
export default serverless({ app });
