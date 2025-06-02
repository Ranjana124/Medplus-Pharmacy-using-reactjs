
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
