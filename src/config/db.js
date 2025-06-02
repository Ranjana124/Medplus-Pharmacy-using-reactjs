
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://ranjanachoudhary124:Ranjana1234@cluster0.4cqpxh3.mongodb.net/medipharm?retryWrites=true&w=majority&directConnection=true', {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
