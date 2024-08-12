import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3002;

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

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

const fetchAllPayments = async () => {
    let allPayments = [];
    let hasMore = true;
    let startingAfter = null;
    const pageSize = 100;

    while (hasMore) {
        try {
            // Fetch a batch of payments
            const data = await fetchPaymentsBatch(pageSize, startingAfter);
            const payments = data.items.filter(payment => payment.captured);

            // Add to the list without duplicates
            const paymentMap = new Map();
            allPayments.forEach(payment => paymentMap.set(payment.id, payment));
            payments.forEach(payment => paymentMap.set(payment.id, payment));
            allPayments = Array.from(paymentMap.values());

            hasMore = data.has_more;
            if (hasMore) {
                startingAfter = data.items[data.items.length - 1].id;
            }
        } catch (error) {
            console.error('Error fetching payments:', error.message, error.response?.data);
            throw new Error('Failed to fetch payments');
        }
    }

    return allPayments;
};

app.get('/api/payments', async (req, res) => {
    try {
        const capturedPayments = await fetchAllPayments();
        const capturedCount = capturedPayments.length;

        res.json({
            totalCount: capturedCount,
            items: capturedPayments,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch payments',
            details: error.message,
        });
    }
});


// The "catchall" handler: for any request that doesn't match one of the API routes, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});