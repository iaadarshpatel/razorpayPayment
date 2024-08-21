import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const PaymentCheck = () => {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);

    // Fetch payments data once when component mounts
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('/api/payments');
                setPayments(response.data.items || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching payments:', err);
                setError('Failed to fetch payments');
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const handleCheck = () => {
        setLoading(true);
        const matchedPayment = payments.find(payment => payment.email === email);
        if (matchedPayment) {
            setResult(matchedPayment);
            setError(null);
        } else {
            setResult(null);
            setError('No payment found for the provided email.');
        }
        setLoading(false);
    };

    const handleClear = () => {
        setEmail('');
        setResult(null);
        setError(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>Check Payments</div>
            <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter email to check" 
            />
            <br />
            <button 
                type="button" 
                style={{ padding: "10px", margin: "10px" }} 
                onClick={handleCheck}
            >
                Check
            </button>
            <button 
                type="button" 
                style={{ padding: "10px", margin: "10px" }} 
                onClick={handleClear}
            >
                Clear
            </button>

            {result && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Payment Details</h3>
                    <p><strong>Payment ID:</strong> {result.id}</p>
                    <p><strong>Amount:</strong> {result.amount / 100}</p>
                    <p><strong>Currency:</strong> {result.currency}</p>
                    <p><strong>Status:</strong> {result.status}</p>
                    <p><strong>Order ID:</strong> {result.order_id}</p>
                    <p><strong>Method:</strong> {result.method}</p>
                    <p><strong>Email:</strong> {result.email}</p>
                    <p><strong>Contact:</strong> {result.contact}</p>
                    <p><strong>Date:</strong> {dayjs.unix(result.created_at).format('D MMM YYYY, h:mm A')}</p>
                    <div style={styles.paymentDetails}>
                          <strong>Notes:</strong>
                          <ul>
                              {Object.entries(result.notes || {}).map(([key, value]) => (
                                  <li key={key}><strong>{key}:</strong> {value}</li>
                              ))}
                          </ul>
                      </div>
                </div>
            )}

            {error && <div style={{ color: "red", marginTop: "20px" }}>{error}</div>}
        </>
    );
};

const styles = {
    paymentItem: {
        borderBottom: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px',
    },
    paymentDetails: {
        marginBottom: '5px',
    },
    pagination: {
        marginTop: '20px',
    },
    pageButton: {
        padding: '10px',
        margin: '5px',
        cursor: 'pointer',
    },
    activePage: {
        padding: '10px',
        margin: '5px',
        fontWeight: 'bold',
        backgroundColor: '#ddd',
        cursor: 'pointer',
    },
};

export default PaymentCheck;
