import React from 'react';

const Footer = () => {
    return (
        <>
            <hr />
            <div className="container footer">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Top Destinations</h5>
                        <ul>
                            <li>Rangamati</li>
                            <li>Khagrachari</li>
                            <li>Bandarban</li>
                            <li>Sylhet</li>
                            <li>Coxsbazar</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Support & FAQs</h5>
                        <ul>
                            <li>Your Booking</li>
                            <li>FAQs</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Policies</h5>
                        <ul>
                            <li>Terms & Conditions</li>
                            <li>Privacy</li>
                            <li>Cookies</li>
                            <li>Content guidelines and reporting content</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Other information</h5>
                        <ul>
                            <li>About us</li>
                            <li>Careers</li>
                            <li>Travel Guides</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;