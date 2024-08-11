import '../assets/css/contact.css';

const Contact = () => {
    return (
        <div className="contact">
            <div className="main">
                <div className="container mt-5">
                    <div className="contact-headline">
                        <h2>Contact Us</h2>
                        <span className="underslash"></span>
                    </div>
                    <div className="contact-box">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="firstname" className="form-label">First Name</label>
                                            <input type="text" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Enter your first name" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="lastname" className="form-label">Last Name</label>
                                            <input type="text" className="form-control" id="lastname" aria-describedby="emailHelp" placeholder="Enter your last name" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="number" className="form-label">Phone Number</label>
                                            <input type="number" className="form-control" id="number" aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label htmlFor="message" className="form-label">Message or Enquiry</label>
                                            <textarea className="form-control" id="message" />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <input type="submit" value="Send Message" className="shadow" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400.2163165467505!2d92.19589712510201!3d22.650766552005546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3752b4f7b91af449%3A0x6e5596648f4e026a!2sHotel%20Nadisa%20International%2C%20Rangamati!5e1!3m2!1sen!2sbd!4v1723333875819!5m2!1sen!2sbd" width="600" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;