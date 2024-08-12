import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'; // Add this line

const CapturedPayments = () => {
    const [payments, setPayments] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const paymentsPerPage = 100;

    const fetchPayments = async (page) => {
        try {
            const skip = (page - 1) * paymentsPerPage;
            const response = await axios.get('/api/payments', {
                params: {
                    skip: skip,
                    count: paymentsPerPage
                }
            });
            setTotalCount(response.data.totalCount);
            setPayments(response.data.items || []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching payments:', err);
            setError('Failed to fetch payments');
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchPayments(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const totalPages = Math.ceil(totalCount / paymentsPerPage);

    return (
        <div>
            <h2>Captured Payments</h2>
            <p>Total Captured Payments: {totalCount}</p>
            <ul>
                {payments.map(payment => (
                      <li key={payment.id} style={styles.paymentItem}>
                      <div style={styles.paymentDetails}>
                          <strong>Payment ID:</strong> {payment.id}
                      </div>
                      <div style={styles.paymentDetails}>
                          <strong>Amount:</strong> {payment.amount / 100} INR {/* Assuming amount is in minor units */}
                      </div>
                      <div style={styles.paymentDetails}>
                          <strong>Currency:</strong> {payment.currency}
                      </div>
                      <div style={styles.paymentDetails}>
                          <strong>Status:</strong> {payment.status}
                      </div>
                      <div style={styles.paymentDetails}>
                          <strong>Order ID:</strong> {payment.order_id}
                      </div>
                      <div style={styles.paymentDetails}>
                          <strong>Method:</strong> {payment.method}
                      </div>
                      <div style={styles.paymentDetails}>
                          <strong>VPA:</strong> {payment.vpa}
                      </div>
                      <div style={styles.paymentDetails}>
                          <strong>Email:</strong> {payment.email}
                      </div>
                      <div style={styles.paymentDetails}>
                          <strong>Contact:</strong> {payment.contact}
                      </div>
                      <div style={styles.paymentDetails}>
                          <strong>Date:</strong> {dayjs.unix(payment.created_at).format('D MMM YYYY, h:mm A')} {/* Format the date */}
                      </div>
                      <div style={styles.paymentDetails}>
                          <strong>Notes:</strong>
                          <ul>
                              {Object.entries(payment.notes || {}).map(([key, value]) => (
                                  <li key={key}><strong>{key}:</strong> {value}</li>
                              ))}
                          </ul>
                      </div>
                  </li>
                ))}
            </ul>

            <div style={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button 
                        key={pageNumber} 
                        onClick={() => handlePageChange(pageNumber)}
                        style={pageNumber === currentPage ? styles.activePage : styles.pageButton}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
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

export default CapturedPayments;
