import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import webpageRoutes from './routes/webpage';
import authRoutes from './routes/auth'; 
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI as string;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/webpage', webpageRoutes);
app.use('/api/auth', authRoutes); 

// Redirect from "/" to "http://localhost:3000" 
// redirecting to element selector thing
app.get('/', (req, res) => {
    res.redirect('https://tinebfrontend.onrender.com/');
});

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Connection error', err);
});
