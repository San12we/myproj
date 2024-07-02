import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS package
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import notificationRoutes from './routes/notification.route.js';
import doctorRoutes from './routes/doctor.route.js'
import appointmentRoutes from './routes/appointment.route.js';
import scheduleRoutes from './routes/schedule.route.js';
import connectMongoDB from '../db/connectMongoDB.js';
import cookieParser from 'cookie-parser';
import path from 'path'
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const PORT = process.env.PORT || 3000;

const __dirname= path.resolve()

// Apply CORS middleware
app.use(cors());

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use("/api/posts", postRoutes);  
app.use("/api/notifications", notificationRoutes); 
app.use('/api/doctors', doctorRoutes)
app.use('/api/schedules', scheduleRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectMongoDB();
});
