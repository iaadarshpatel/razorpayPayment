import { useState, useEffect } from "react";
import axios from "axios";

const ShowPayments = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('mongodb://0.0.0.0:27017/payments');
                console.log('Response Data:', response.data); // Log response data for debugging
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching data:', err.response ? err.response.data : err.message);
                setError('Failed to fetch data.');
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <div>
                {error && <p>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>OrderID</th>
                            <th>International</th>
                            <th>Method</th>
                            <th>VPA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.ID}>
                                    <td>{user.ID}</td>
                                    <td>{user.Amount}</td>
                                    <td>{user.Status}</td>
                                    <td>{user.OrderID}</td>
                                    <td>{user.International ? 'Yes' : 'No'}</td>
                                    <td>{user.Method}</td>
                                    <td>{user.VPA}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ShowPayments;
