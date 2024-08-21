import React, { useState, useEffect } from 'react';
import PaymentCheck from './PaymentCheck';
import CapturedPayments from './CapturedPayments';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import ShowPayments from './ShowPayments';

function App() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('/api/payments');
                setPayments(response.data.items || []);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<CapturedPayments />} />
                    <Route path="/paymentcheck" element={<PaymentCheck payments={payments} />} />
                    <Route path="/capturedpayments" element={<CapturedPayments />} />
                    <Route path="/test" element={<ShowPayments />} />
                </Routes>
            </Router>
        </div>
    );
}


export default App;
