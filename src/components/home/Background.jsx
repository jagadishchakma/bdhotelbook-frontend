import { Link } from 'react-router-dom';
import background from '../../assets/images/background.png';
const Background = () => {
    return (
        <div className="background">
            <img src={background} alt="" />
            <div className="background-text d-flex align-items-center">
                <div>
                    <h1 className="mb-4">Online Hotel Booking</h1>
                    <p>Welcome to Your Ultimate Travel Experience!
                        Where Comfort Meets Luxury in Every Stay.
                        Find Your Perfect Destination, Tailored Just for You.
                        Seamless Booking, Unmatched Convenience.
                        Start Your Journey Today – Your Dream Hotel Awaits!</p>
                    <Link to="/hotels/rangamati" className="btn btn-secondary">Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default Background;