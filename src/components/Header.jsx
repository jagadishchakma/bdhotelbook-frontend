import { useContext } from 'react';
import { AuthContext } from '../utility/AuthContext';
import { Link } from 'react-router-dom';


const Header = () => {
    const { user, logout,finished } = useContext(AuthContext);

   
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
                <div className="container">
                    <Link className="navbar-brand" to="/">BDHOTELBOOK</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                {
                                    user && (
                                        <Link className="nav-link" to="/account/deposit">Deposit</Link>
                                    )
                                }
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            {user && (
                                <>
                                    <span className="me-5 balance">Balance: {user.profile.balance}.00৳</span>
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={user && user.profile.image} alt={user && user.username} id="profile-image"/>
                                            </a>
                                            <ul className="dropdown-menu">
                                                <Link to="/account/profile" className="dropdown-item">Profile</Link>
                                                <Link to="/account/login" className="dropdown-item" onClick={logout}>Logout</Link>
                                            </ul>
                                        </li>
                                    </ul>
                                </>
                            )}
                            {!user && (
                                <>
                                    <Link to="/account/register" className="btn btn-outline-info">Register</Link>
                                    <Link to="/account/login" className="btn btn-primary ms-3">Login</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;