import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utility/AuthContext';
import { authapi } from '../../utility/api';

const ProfileInfo = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')
    const [basicInfo, setBasicInfo] = useState({
        first_name: '',
        last_name: ''
    });
    const [personalInfo, setPersonalInfo] = useState({
        phone_no: '',
        gender: '',
        birth_year: '',
        birth_month: '',
        birth_date: '',
        bio: '',
        address: ''
    });
    const { user, setReloadUser, reloadUser } = useContext(AuthContext);

    useEffect(() => {
        setPersonalInfo({
            phone_no: user && user.profile.phone_no ? user.profile.phone_no : '',
            gender: user && user.profile.gender ? user.profile.gender : 'choose',
            birth_year: user && user.profile.birth_year ? user.profile.birth_year : '',
            birth_month: user && user.profile.birth_month ? user.profile.birth_month : '',
            birth_date: user && user.profile.birth_date ? user.profile.birth_date : '',
            bio: user && user.profile.bio ? user.profile.bio : '',
            address: user && user.profile.address ? user.profile.address : '',
        })
        setBasicInfo({
            first_name: user && user.first_name?user.first_name:'',
            last_name: user && user.last_name?user.last_name:'',
        })
    }, [user])

    const handleUpdateProfileSubmit = async (e,type,modal_id) => {
        setMessage('');
        setLoading(true);
        e.preventDefault();
        try {
            if(type == 'personal'){
                await authapi.patch('account/update/profile/', personalInfo);
            }
            if(type=='basic'){
                await authapi.patch('account/update/user/', basicInfo);
            }
            setMessage('success')
            setReloadUser(reloadUser + 1);
            setTimeout(() => {
                setLoading(false);
                setMessage('');
                const modal = document.getElementById(modal_id);
                const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
                if (modal && modalBackdrop) {
                    modal.classList.remove('show');
                    document.body.classList.remove('modal-open');
                    modalBackdrop.remove();
                    document.body.removeAttribute('style');
                }
            }, 2000);
        } catch (error) {
            setLoading(false);
            setMessage('error')
        }
    }
    return (
        <>
            <h2>{user && user.first_name} {user && user.last_name}</h2>
            <div className="mt-5">
                <div className="d-flex justify-content-between gap-2">
                    <h2>Basic Information</h2>
                    <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#basicInfoEdit">Edit</button>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h6>User name</h6>
                        <p>{user && user.username}</p>
                    </div>
                    <div className="col-md-6">
                        <h6>Email</h6>
                        <p>{user && user.email}</p>
                    </div>
                    <div className="col-md-6">
                        <h6>First name</h6>
                        <p>{user && user.first_name}</p>
                    </div>
                    <div className="col-md-6">
                        <h6>Last name</h6>
                        <p>{user && user.last_name}</p>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div className="d-flex justify-content-between gap-2">
                    <h2>Personal Information</h2>
                    <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#personalEditModal">Edit</button>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h6>Phone no</h6>
                        <p>{user && user.profile.phone_no ? user.profile.phone_no : "empty"}</p>
                    </div>
                    <div className="col-md-6">
                        <h6>Gender</h6>
                        <p>{user && user.profile.gender ? user.profile.gender : "empty"}</p>
                    </div>
                    <div className="col-md-6">
                        <h6>Date of birth </h6>
                        <p>
                            {user && user.profile.birth_date ? user.profile.birth_date : "0"}/
                            {user && user.profile.birth_month ? user.profile.birth_month : "0"}/
                            {user && user.profile.birth_year ? user.profile.birth_year : "0"}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h6>Balance</h6>
                        <p>{user && user.profile.balance} </p>
                    </div>
                    <div className="col-md-6">
                        <h6>Bio</h6>
                        <p>{user && user.profile.bio ? user.profile.bio : 'empty'} </p>
                    </div>
                    <div className="col-md-6">
                        <h6>Address</h6>
                        <p>{user && user.profile.address ? user.profile.address : 'empty'} </p>
                    </div>
                </div>
            </div>
            <div className="all-modal">
                <div className="personal-info-edit-modal">
                    <div className="modal fade" id="personalEditModal" tabIndex="-1" aria-labelledby="personalEditModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {
                                        message && message == 'success' ? (
                                            <div className="alert alert-success" role="alert">
                                                <i className="bi bi-check-square-fill"></i> Updated Successfully!
                                            </div>
                                        ) : message == 'error' && (
                                            <div className="alert alert-danger" role="alert">
                                                <i className="bi bi-bag-x-fill"></i> Update Failed.Something Went Wrong
                                            </div>
                                        )
                                    }
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(e)=>handleUpdateProfileSubmit(e,'personal', 'personalEditModal')}>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="number"
                                                name="phone_no"
                                                id="phone_no"
                                                className="form-control"
                                                value={personalInfo.phone_no}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, phone_no: e.target.value })}
                                                placeholder=''
                                            />
                                            <label htmlFor="phone_no">Phone no</label>

                                        </div>

                                        <div className="form-floating mb-3">
                                            <select
                                                className="form-select"
                                                id="gender"
                                                value={personalInfo.gender}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                                            >
                                                <option value="choose">Open this select menu</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            <label htmlFor="gender">Gender</label>

                                        </div>

                                        <div className="row" id='birth-date'>
                                            <div className="form-floating mb-3 col-4">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="birth_year"
                                                    value={personalInfo.birth_year}
                                                    onChange={(e) => setPersonalInfo({ ...personalInfo, birth_year: e.target.value })}
                                                    placeholder=''
                                                />
                                                <label htmlFor="birth_year">Birth Year</label>

                                            </div>

                                            <div className="form-floating mb-3 col-4">
                                                <input type="number"
                                                    className="form-control"
                                                    id="birth_month"
                                                    value={personalInfo.birth_month}
                                                    onChange={(e) => setPersonalInfo({ ...personalInfo, birth_month: e.target.value })}
                                                    placeholder=''
                                                />
                                                <label htmlFor="birth_month">Birth Month</label>

                                            </div>

                                            <div className="form-floating mb-3 col-4">
                                                <input type="number"
                                                    className="form-control"
                                                    value={personalInfo.birth_date}
                                                    id="birth_date"
                                                    onChange={(e) => setPersonalInfo({ ...personalInfo, birth_date: e.target.value })}
                                                    placeholder=''
                                                />
                                                <label htmlFor="birth_date">Birth date</label>

                                            </div>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <textarea
                                                className="form-control"
                                                id="bio"
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                                                value={personalInfo.bio}
                                                placeholder=''
                                            >

                                            </textarea>
                                            <label htmlFor="bio">Bio</label>

                                        </div>
                                        <div className="form-floating mb-3">
                                            <textarea
                                                className="form-control"
                                                id='address'
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                                                value={personalInfo.address}
                                                placeholder=''
                                            >

                                            </textarea>
                                            <label htmlFor="address">Address</label>

                                        </div>

                                        <div>
                                            {loading ? <button className="btn btn-primary" type="button" disabled>
                                                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                                <span role="status">Loading...</span>
                                            </button> : <button type="submit" className="btn btn-success">UPDATE</button>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basic-info-edit-modal">
                    <div className="modal fade" id="basicInfoEdit" tabIndex="-1" aria-labelledby="basicInfoEditLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {
                                        message && message == 'success' ? (
                                            <div className="alert alert-success" role="alert">
                                                <i className="bi bi-check-square-fill"></i> Updated Successfully!
                                            </div>
                                        ) : message == 'error' && (
                                            <div className="alert alert-danger" role="alert">
                                                <i className="bi bi-bag-x-fill"></i> Update Failed.Something Went Wrong
                                            </div>
                                        )
                                    }
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(e)=>handleUpdateProfileSubmit(e,'basic', 'basicInfoEdit')}>
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                name="username"
                                                className="form-control"
                                                id="username"
                                                value={user && user.username?user.username:''}
                                                disabled
                                                placeholder=''
                                            />
                                            <label htmlFor="username">Username</label>

                                        </div>

                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                name="first_name"
                                                className="form-control"
                                                id="first_name"
                                                value={basicInfo.first_name}
                                                onChange={(e) => setBasicInfo({...basicInfo,first_name:e.target.value})}
                                                placeholder=''
                                            />
                                            <label htmlFor="first_name">First Name</label>

                                        </div>

                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                name="last_name"
                                                className="form-control"
                                                id="last_name"
                                                value={basicInfo.last_name}
                                                onChange={(e) => setBasicInfo({...basicInfo,last_name:e.target.value})}
                                                placeholder=''
                                            />
                                            <label htmlFor="last_name">Last Name</label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                id="email"
                                                value={user && user.email?user.email:''}
                                                placeholder=''
                                                disabled
                                            />
                                            <label htmlFor="email">Email</label>

                                        </div>

                                        <div>
                                            {loading ? <button className="btn btn-primary" type="button" disabled>
                                                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                                <span role="status">Loading...</span>
                                            </button> : <button type="submit" className="btn btn-success">UPDATE</button>}
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileInfo;

