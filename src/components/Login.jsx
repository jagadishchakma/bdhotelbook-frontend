// LoginForm.js
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../utility/AuthContext';
import login_image from '../assets/images/login.png'
import '../assets/css/login.css';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [togglePass1, setTogglePass1] = useState(false)
    const [error, setError] = useState('');
    const [message, setMessage] = useState({ msg: '', color: '', icon: '' });
    const [loading, setLoading] = useState(false);

    //verification success status
    const location = useLocation();

    //redirect authenticated user
    const { login, user, finished } = useContext(AuthContext);
    if (finished) {
        if (user) window.location.href = '/account/profile';
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        if (status === 'success') {
            setMessage({
                msg: 'Verification successful! You can now log in.',
                color: 'success',
                icon: 'bi-check-circle-fill'
            })
        } else if (status === 'failure') {
            setMessage({
                msg: 'Verification failed! something went wrong',
                color: 'danger',
                icon: 'bi-backspace-reverse-fill'
            })
        } else if (status == 'already_verified') {
            setMessage({
                msg: 'Already verified! You can login anytime',
                color: 'warning',
                icon: 'bi-bell-fill'
            })
        }
    }, [location.search]);

    //login handle
    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault();
        let result = await login({ username, password });
        setLoading(false)
        if (result == 'error') {
            setError("Login Failed")
        } else {
            window.location.href = '/'
        }
    };

    const handleTogglePass1 = () => {
        setTogglePass1(!togglePass1)
    }

    return (
        <div className="container mt-5 main">
            <div className="login">
                <div className="row justify-content-between">
                    <div className="col-md-5">
                        <img src={login_image} alt="login" />
                    </div>
                    <div className="col-md-6">
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {message.msg && !error && <div className={`alert alert-${message.color} mt-3 mb-3`} role="alert"> <i className={`bi ${message.icon}`}></i> {message.msg}  </div>}
                        <div className="card login-card shadow">
                            <div className="card-body">
                                <fieldset>
                                    <legend>Login</legend>
                                    <form onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                id="username"
                                                className="form-control shadow-sm"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type={togglePass1 ? "text" : "password"}
                                                id="password"
                                                className="form-control shadow-sm"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <i className={togglePass1 ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword" onClick={handleTogglePass1}></i>
                                        </div>

                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            {loading ? <button class="btn btn-primary mt-3" type="button" disabled>
                                                <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                                <span role="status">Loading...</span>
                                            </button> : <button type="submit" className="btn  mt-4 w-100 login-btn">Submit</button>}
                                            <p className="auth-success-terms">Don't have an account? <Link to="/account/register">Register Now</Link></p>
                                        </div>
                                    </form>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
