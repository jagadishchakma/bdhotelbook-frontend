import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utility/AuthContext';
import ProfileInfo from './profile/ProfileInfo';
import ActiveBooked from './profile/ActiveBooked';
import BookedHistory from './profile/BookedHistory';
import ReviewHisotry from './profile/ReviewHistory';
import { authapi, upload_api } from '../utility/api';

const Profile = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({
        old_pass: false,
        new_pass: false,
        confirm_pass: false
    })
    const [nav, setNav] = useState({
        profile: true,
        active_booked: false,
        booked_history: false,
        review: false
    })

    //redirect unauthenticated user
    if(!localStorage.getItem('token')) window.location.href="/account/login"
    const { user, logout, setReloadUser, reloadUser, finished } = useContext(AuthContext);
    if(finished){
        if(user==null) window.location.href = '/account/login';
    }


    const handleNavigation = (type) => {
        if (type == 'profile') setNav({ profile: true, active_booked: false, booked_history: false, review: false });
        if (type == 'active_booked') setNav({ profile: false, active_booked: true, booked_history: false, review: false });
        if (type == 'booked_history') setNav({ profile: false, active_booked: false, booked_history: true, review: false });
        if (type == 'review') setNav({ profile: false, active_booked: false, booked_history: false, review: true });
    }

    //passwordchange handler
    const handleChagnePass = () => {
        setLoading(true)
        if (newPassword != confirmPassword) {
            setErrors({ old_pass: false, new_pass: false, confirm_pass: 'Confirm password is wrong.' })
            setLoading(false)
            return
        }

        const check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!check.test(newPassword)) {
            setErrors({ old_pass: false, confirm_pass: false, new_pass: 'Password must be 6 character with number,symbol,lowercase,upercase' })
            setLoading(false)
            return
        }

        try {
            authapi.post('account/pass_change/', { old_pass: oldPassword, new_pass: newPassword })
             logout()
             setLoading(false)
        } catch (error) {
            setErrors({ old_pass: false, new_pass: 'Please provide a strong password', confirm_pass: false })
            setLoading(false)
        }
    }

    //photo change handler
    const photoChangeHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    //photo upload handler
    const photoUploadHandler = async () => {
        setLoading(true);
        if (!image) {
            alert('Please select a file first!');
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('image', image);
        try {
            const response = await upload_api.post('account/upload/profile/', formData);
            setReloadUser(reloadUser + 1);
            setLoading(false);
            const modal = document.getElementById('photoChangeModal');
            const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
            if (modal && modalBackdrop) {
                modal.classList.remove('show');
                document.body.classList.remove('modal-open');
                modalBackdrop.remove();
                document.body.removeAttribute('style');
            }

        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="container profile-container main mb-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-4">
                    <div className="profile-bar">
                        <div className="profile-image">
                            <img src={user && user.profile.image} alt={user && user.username} />
                            <span className="change-photo" data-bs-toggle="modal" data-bs-target="#photoChangeModal"><i className="bi bi-pencil-fill"></i> Change Photo</span>
                        </div>
                        <div>
                            <span className="pass-change" data-bs-toggle="modal" data-bs-target="#passChangeModal"><i className="bi bi-pencil-fill"></i> Change Password</span>
                        </div>
                        <div className="text-center">
                            <h5>Hi, {user && user.first_name} {user && user.last_name}</h5>
                            <p>{user && user.email}</p>
                        </div>
                    </div>
                    <div className={nav.profile ? 'sub-profile active-nav' : 'sub-profile'} onClick={() => handleNavigation('profile')}>
                        <div className="d-flex align-items-center justify-content-between gap-3">
                            <div className="d-flex justify-content-start align-items-center gap-2">
                                <i className="bi bi-person-fill"></i>
                                <div>
                                    <span><strong>Profile</strong></span> <br />
                                    <span>See and edit your profile</span>
                                </div>
                            </div>
                            <i className="bi bi-caret-right-fill"></i>
                        </div>
                    </div>
                    <div className={nav.active_booked ? 'sub-profile active-nav' : 'sub-profile'} onClick={() => handleNavigation('active_booked')}>
                        <div className="d-flex align-items-center justify-content-between gap-3">
                            <div className="d-flex justify-content-start align-items-center gap-2">
                                <i className="bi bi-house-door-fill"></i>
                                <div>
                                    <span><strong>Active Booked</strong></span> <br />
                                    <span>See and edit your active booked room</span>
                                </div>
                            </div>
                            <i className="bi bi-caret-right-fill"></i>
                        </div>
                    </div>
                    <div className={nav.booked_history ? 'sub-profile active-nav' : 'sub-profile'} onClick={() => handleNavigation('booked_history')}>
                        <div className="d-flex align-items-center justify-content-between gap-3">
                            <div className="d-flex justify-content-start align-items-center gap-3">
                                <i className="bi bi-clock-history"></i>
                                <div>
                                    <span><strong>Booked History</strong></span> <br />
                                    <span>See your room booked history</span>
                                </div>
                            </div>
                            <i className="bi bi-caret-right-fill"></i>
                        </div>
                    </div>
                    <div className={nav.review ? 'sub-profile active-nav' : 'sub-profile'} onClick={() => handleNavigation('review')}>
                        <div className="d-flex align-items-center justify-content-between gap-3">
                            <div className="d-flex justify-content-start align-items-center gap-3">
                                <i className="bi bi-chat-left-fill"></i>
                                <div>
                                    <span><strong>Reviews</strong></span> <br />
                                    <span>See your reviews</span>
                                </div>
                            </div>
                            <i className="bi bi-caret-right-fill"></i>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                    <div className="profile-edit-bar shadow-sm">
                        {nav.profile && <ProfileInfo />}
                        {nav.active_booked && <ActiveBooked />}
                        {nav.booked_history && <BookedHistory />}
                        {nav.review && <ReviewHisotry />}
                    </div>
                </div>
            </div>
            <div className="all-modal">
                <div className="pass-change-modal">
                    <div className="modal fade" id="passChangeModal" tabIndex="-1" aria-labelledby="passChangeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="passChangeModalLabel">Change Password</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-floating mb-3">
                                        <input type="password" name="old_pass" className="form-control" id="old_pass" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='' />
                                        <label htmlFor="old_pass">Old Password</label>
                                        {errors.old_pass && <span className="invalid-feedback">{errors.old_pass}</span>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" name="new_pass" className="form-control" id="new_pass" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='' />
                                        <label htmlFor="new_pass">New Password</label>
                                        {errors.new_pass && <span className="invalid-feedback">{errors.new_pass}</span>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" name="confirm_password" className="form-control" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='' />
                                        <label htmlFor="confirm_password">Confirm Password</label>
                                        {errors.confirm_pass && <span className="invalid-feedback">{errors.confirm_pass}</span>}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {
                                        loading ? (
                                            <div className="spinner-border m-5" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            <button type="button" className="btn btn-primary" onClick={handleChagnePass}>Change Password</button>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="photo-change-modal">
                    <div className="modal fade" id="photoChangeModal" tabIndex="-1" aria-labelledby="photoChangeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="card-title">Change Photo</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {imagePreview && <img src={imagePreview} alt="image" width="100%" height="100%" />}
                                    <div className="mb-3 mt-4">
                                        <input className="form-control" type="file" id="formFile" onChange={photoChangeHandler} required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {
                                        loading ? (
                                            <div className="spinner-border m-5" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            <button type="button" className="btn btn-primary" onClick={photoUploadHandler}>Change Photo</button>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;