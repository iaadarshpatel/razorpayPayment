import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import DatabaseConnect from '../db/DatabaseConnect.js';
import UserModel from '../models/Users.js';
import cors from 'cors';

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
DatabaseConnect(); 

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors())


// Fetch a batch of payments
const fetchPaymentsBatch = async (pageSize, startingAfter = null) => {
    const response = await axios.get('https://api.razorpay.com/v1/payments', {
        auth: {
            username: process.env.RAZORPAY_KEY_ID,
            password: process.env.RAZORPAY_SECRET,
        },
        params: {
            count: pageSize,
            ...(startingAfter && { starting_after: startingAfter }),
        },
    });

    return response.data;
};

// API endpoint to get payments
app.get('/api/payments', async (req, res) => {
    try {
        const pageSize = 100; // Define your page size
        const data = await fetchPaymentsBatch(pageSize);
        const capturedPayments = data.items.filter(payment => payment.captured);
        
        res.json({
            totalCount: capturedPayments.length,
            items: capturedPayments,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
});

app.get('/getUsers', async (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
