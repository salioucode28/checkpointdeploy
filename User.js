import mongoose from 'mongoose';

// Schéma pour User
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number }
});

// Export du modèle
export default mongoose.model('User', userSchema);




