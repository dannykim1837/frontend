import React, { useState } from 'react';
import axios from 'axios';
import { saveToken } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Link 추가
import '../styles/siteStyle.css';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/token/', form);
            localStorage.setItem('token', res.data.access);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login Error:', err);
            alert('Login failed. Check credentials.');
        }
    };

    return (
        <section id="login-page">
            <form className="bordered-form" onSubmit={handleLogin}>
                <h2>Login</h2>

                <label htmlFor="username">Username</label>
                <input
                    className="form-text-input"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="test@mail.com"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    className="form-text-input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                />

                <div className="password-container">
                    <label>
                        <input
                            className="show-password"
                            type="checkbox"
                            onClick={() => {
                                const input = document.getElementById('password');
                                input.type = input.type === 'password' ? 'text' : 'password';
                            }}
                        />
                        Show Password
                    </label>
                    <a className="fake-link" href="#">Forgot password?</a>
                </div>

                <button className="form-button" type="submit">Sign In</button>

                <div className="center-text">
                    <Link className="fake-link" to="/register">Not a member? Sign up here!</Link>
                </div>
            </form>
        </section>
    );
};

export default Login;
