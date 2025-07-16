// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getToken, logout } from '../utils/auth';
import InvoiceChart from './InvoiceChart';
import ExpenseChart from './ExpenseChart';
import UploadReceipt from './UploadReceipt';
import { exportToCSV } from '../utils/exportToCSV';
import TopNav from './TopNav';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [receiptUrl, setReceiptUrl] = useState(null);

    // Fetch invoices from backend
    const fetchInvoices = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/invoices/', {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setInvoices(res.data);
        } catch (err) {
            console.error('Failed to fetch invoices', err);
        }
    };

    // Fetch expenses from backend
    const fetchExpenses = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/expenses/', {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setExpenses(res.data);
        } catch (err) {
            console.error('Failed to fetch expenses', err);
        }
    };

    // Load data when component mounts
    useEffect(() => {
        fetchInvoices();
        fetchExpenses();
    }, []);

    // Get latest invoice and expense
    const latestInvoice = invoices[invoices.length - 1];
    const latestExpense = expenses[expenses.length - 1];

    return (
        <>
            <TopNav /> {/* Reusable navigation bar */}

            <div className="dashboard-container">
                <main className="dashboard-main">
                    <h3>Quick Summary</h3>

                    <div className="stat-cards">
                        <div className="stat-card">
                            <div className="stat-main">
                                {/* Total Invoice Amount (sum as number!) */}
                                ${invoices.reduce((sum, i) => sum + Number(i.amount), 0).toLocaleString()}
                            </div>
                            <div className="stat-label">Total Invoice Amount</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-main">
                                {/* Total Expense Amount (sum as number!) */}
                                ${expenses.reduce((sum, e) => sum + Number(e.amount), 0).toLocaleString()}
                            </div>
                            <div className="stat-label">Total Expense Amount</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-main">{invoices.length}</div>
                            <div className="stat-label">Invoice Count</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-main">{expenses.length}</div>
                            <div className="stat-label">Expense Count</div>
                        </div>
                    </div>


                    <div className="summary-charts">
                        <div className="chart-box">
                            <h4>Invoice Summary</h4>
                            <div className="invoice-chart-wrapper">
                                <InvoiceChart data={invoices} />
                            </div>
                            {latestInvoice && (
                                <p>Latest: {latestInvoice.title} - ${latestInvoice.amount}</p>
                            )}
                        </div>

                        <div className="chart-box">
                            <h4>Expense Summary</h4>
                            <div className="expense-chart-wrapper">
                                <ExpenseChart data={expenses} />
                            </div>
                            {latestExpense && (
                                <p>Latest: {latestExpense.title} - ${latestExpense.amount}</p>
                            )}
                        </div>
                    </div>

                    <section className="upload-section">
                        <h3>Upload Receipt</h3>
                        <UploadReceipt onUploaded={(url) => setReceiptUrl(url)} />
                        {receiptUrl && (
                            <div>
                                <p>Uploaded Receipt Preview:</p>
                                <img
                                    src={receiptUrl}
                                    alt="Uploaded Receipt"
                                    style={{ maxWidth: '300px', marginTop: '10px' }}
                                />
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </>
    );
};
export default Dashboard;
