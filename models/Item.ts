import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
export default Item;
