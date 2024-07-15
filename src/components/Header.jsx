import { useContext, useState } from 'react';
import { AuthContext } from '../utility/AuthContext';
import { Link } from 'react-router-dom';
import { authapi } from '../utility/api';

const Header = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user, logout,finished } = useContext(AuthContext);

    const handleDeposit = async (e) => {
        setError('');
        setSuccess('')
        setLoading(true);
        e.preventDefault();
        if (balance < 500) {
            setError('Minimum deposite amount is 500 TK. You can\'t deposite less than')
            setLoading(false);
            return
        }
        if (balance > 10000000) {
            setError('Maximum deposite amount is 10 milion. You can\'t deposite more than')
            setLoading(false);
            return
        }
        try {
            const response = await authapi.put('account/balance/update/', { balance: balance });
            setSuccess('Deposited successfull')
            setTimeout(() => {
                setLoading(false);
                window.location.reload();
            }, 1000);

        } catch (error) {
            setLoading(false);
            setError("Falied to deposited,something went wrong!")
        }
    }
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
                                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                {
                                    user && (
                                        <Link className="nav-link" to="" data-bs-toggle="modal" data-bs-target="#exampleModal">Deposit</Link>
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
            {/* modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleDeposit}>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="floatingInput" placeholder="name@example.com" value={balance} onChange={(e) => setBalance(e.target.value)} />
                                    <label htmlFor="floatingInput">Enter Amount</label>
                                    <span className="invalid-feedback">{error && error}</span>
                                    <span className="valid-feedback">{success && success}</span>
                                </div>
                                <div>
                                    {loading ? <button className="btn btn-primary mt-4" type="button" disabled>
                                        <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                        <span role="status">Loading...</span>
                                    </button> : <button type="submit" className="btn btn-info mt-4 ">Submit</button>}
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;