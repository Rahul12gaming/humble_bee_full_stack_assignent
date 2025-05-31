import mongoose from 'mongoose';

const hiveSchema = new mongoose.Schema({
  hiveId: { type: String, required: true, unique: true },
  datePlaced: { type: Date, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  numColonies: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Hive', hiveSchema);
