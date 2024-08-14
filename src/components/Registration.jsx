// RegistrationForm.js
import React, { useContext, useState } from 'react';
import api from '../utility/api';
import { AuthContext } from '../utility/AuthContext';
import { Link } from 'react-router-dom';
import login_image from '../assets/images/registration.png'
import '../assets/css/registration.css';

const RegistrationForm = () => {
    const [togglePass1, setTogglePass1] = useState(false)
    const [togglePass2, setTogglePass2] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    //redirect authenticated user
    const { user, finished } = useContext(AuthContext);
    if (finished) {
        if (user) window.location.href = '/account/profile';
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!formData.username) {
            formIsValid = false;
            errors["username"] = "Username is required";
        }

        if (!formData.first_name) {
            formIsValid = false;
            errors["first_name"] = "First name is required";
        }

        if (!formData.last_name) {
            formIsValid = false;
            errors["last_name"] = "Last name is required";
        }

        if (!formData.email) {
            formIsValid = false;
            errors["email"] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formIsValid = false;
            errors["email"] = "Email is invalid";
        }

        if (!formData.password) {
            formIsValid = false;
            errors["password"] = "Password is required";
        }

        if (!formData.confirm_password) {
            formIsValid = false;
            errors["confirm_password"] = "Confirm password is required";
        } else if (formData.password !== formData.confirm_password) {
            formIsValid = false;
            errors["confirm_password"] = "Passwords do not match";
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleTogglePass1 = () => {
        setTogglePass1(!togglePass1)
    }

    const handleTogglePass2 = () => {
        setTogglePass2(!togglePass2)
    }
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        if (validateForm()) {
            api.post('account/register/', formData)
                .then(response => {
                    setLoading(false);
                    setMessage(response.data);
                    setFormData({
                        username: '',
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: '',
                        confirm_password: ''
                    })
                })
                .catch(error => {
                    setLoading(false)
                    if (error.response.data.username) {
                        setErrors({ username: error.response.data.username[0] })
                        return
                    }
                    if (error.response.data.error) {
                        setErrors({ email: error.response.data.error })
                        return
                    }
                    setMessage('Registration failed for something went wrong! please try again');
                });
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="container main mb-5 mt-5">
            <div className="registration">
                <div className="row justify-content-between">
                    <div className="col-md-5 d-flex align-items-center">
                        <img src={login_image} alt="login" />
                    </div>
                    <div className="col-md-6">
                        {message && <div className="alert alert-success mt-3 regi-submit-alert" role="alert"> <p><i class="bi bi-check-circle-fill"></i> {message} </p> </div>}

                        <form onSubmit={handleSubmit} className="shadow d-flex justify-content-center align-items-center">
                            <fieldset>
                                <legend>Registration</legend>
                                <div className="row">
                                    <div className="form-floating mb-3 col-12">
                                        <input type="text" name="username" className="form-control" id="username" value={formData.username} onChange={handleChange} placeholder='' />
                                        <label htmlFor="username">Username</label>
                                        {errors.username && <span className="invalid-feedback">{errors.username}</span>}
                                    </div>

                                    <div className="form-floating mb-3 col-12">
                                        <input type="email" name="email" className="form-control" id="email" value={formData.email} onChange={handleChange} placeholder='' />
                                        <label htmlFor="email">Email</label>
                                        {errors.email && <span className="invalid-feedback">{errors.email}</span>}
                                    </div>

                                    <div className="form-floating mb-3 col-12">
                                        <input type="text" name="first_name" className="form-control" id="first_name" value={formData.first_name} onChange={handleChange} placeholder='' />
                                        <label htmlFor="first_name">First Name</label>
                                        {errors.first_name && <span className="invalid-feedback">{errors.first_name}</span>}
                                    </div>

                                    <div className="form-floating mb-3 col-12">
                                        <input type="text" name="last_name" className="form-control" id="last_name" value={formData.last_name} onChange={handleChange} placeholder='' />
                                        <label htmlFor="last_name">Last Name</label>
                                        {errors.last_name && <span className="invalid-feedback">{errors.last_name}</span>}
                                    </div>



                                    <div className="form-floating mb-3 col-12">
                                        <input type={togglePass1 ? "text" : "password"} name="password" className="form-control" id="password" value={formData.password} onChange={handleChange} placeholder='' />
                                        <i className={togglePass1 ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword" onClick={handleTogglePass1}></i>
                                        <label htmlFor="password">Password</label>
                                        {errors.password && <span className="invalid-feedback">{errors.password}</span>}
                                    </div>

                                    <div className="form-floating mb-5 col-12">
                                        <input type={togglePass2 ? "text" : "password"} name="confirm_password" className="form-control" id="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder='' />
                                        <i className={togglePass2 ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword" onClick={handleTogglePass2}></i>
                                        <label htmlFor="confirm_password">Confirm Password</label>
                                        {errors.confirm_password && <span className="invalid-feedback">{errors.confirm_password}</span>}
                                    </div>
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    {loading ? <button class="btn btn-primary" type="button" disabled>
                                        <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                        <span role="status">Loading...</span>
                                    </button> : <button type="submit" className="btn regi-btn w-100">Submit</button>}
                                    <p className="auth-success-terms text-center">Already have an account? <Link to="/account/login">LOG IN</Link></p>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
