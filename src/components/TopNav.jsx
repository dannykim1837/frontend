import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';

const TopNav = () => (
  <nav className="top-nav">
    <h2 className="logo">Invoice Manager</h2>
    <ul className="nav-links">
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/invoices">Invoices</Link></li>
      <li><Link to="/expenses">Expenses</Link></li>
      <li><button onClick={logout}>Logout</button></li>
    </ul>
  </nav>
);

export default TopNav;
