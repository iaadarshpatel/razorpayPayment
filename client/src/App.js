import React from 'react';
import PaymentCheck from './PaymentCheck';
import CapturedPayments from './CapturedPayments';
import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<CapturedPayments />} />
                    <Route path="/payment-check" element={<PaymentCheck />} />
                    <Route path="/captured-payments" element={<CapturedPayments />} />
                    <Route path="/api/payments" element={<CapturedPayments />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
