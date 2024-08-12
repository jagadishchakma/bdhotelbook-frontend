import { useContext, useState } from 'react';
import { authapi } from '../utility/api';
import '../assets/css/deposit.css';
import { AuthContext } from '../utility/AuthContext';

const Deposit = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { user } = useContext(AuthContext);
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
        <div className="main d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="w-50 m-auto deposit-box shadow">
                    <div className="account-info mb-5">
                        <div className="d-flex align-items-center text-white gap-3">
                            <img src={user && user.profile.image} alt={user && user.username} width="50" height="50" className="rounded-circle" />
                            <strong>{user && user.username}</strong>
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 text-white mt-4">
                            <p className="deposit-title">YOUR BALANCE</p>
                            <h4>Tk.{user && user.profile.balance}</h4>
                        </div>
                    </div>
                    <form onSubmit={handleDeposit}>
                        <div className="text-white">
                            <h3>Deposit</h3>
                            <p className="deposit-title">AMOUNT</p>
                        </div>
                        <div className="mb-3">
                            <div className="deposit-input"><input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} /></div>
                            <span className="invalid-feedback">{error && error}</span>
                            <span className="valid-feedback">{success && success}</span>
                        </div>
                        <div>
                            {loading ? <button className="btn btn-primary mt-4" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </button> : <button type="submit" className="btn w-25 deposit-submit shadow">Submit</button>}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Deposit;