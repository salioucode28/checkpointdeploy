import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import User from './models/user.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Vérifie la variable d'environnement
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI missing in .env');
  process.exit(1);
}

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: "restapi", useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

/* ----------- ROUTES ----------- */

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT update user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: deletedUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/* ----------- START SERVER ----------- */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
