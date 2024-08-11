import { Link } from "react-router-dom";

const OurRooms = () => {
    return (
        <div>
            <h1 className="about-title text-center">Our Rooms</h1>
            <div className="our-rooms">
                <div className="row d-flex justify-content-center align-items-center mb-5">
                    <div className="col-md-6">
                        <img src="https://cdn.pixabay.com/photo/2021/08/27/01/33/bedroom-6577523_1280.jpg" alt="bd hotel rooms" />
                    </div>
                    <div className="col-md-6">
                        <h2>PIECE OF MIND</h2>
                        <p className="about-text">
                            These websites provide a wide range of options including hotels, guesthouses, hostels and vacations rentals in various locations accross the world.
                        </p>
                        <Link to="/" className="btn about-btn">EXPLORE OUR ROOM</Link>
                    </div>
                </div>

                <div className="row d-flex justify-content-center align-items-center mb-5">
                    <div className="col-md-6">
                        <h2>DELUXE ROOM</h2>
                        <p className="about-text">
                            These websites provide a wide range of options including hotels, guesthouses, hostels and vacations rentals in various locations accross the world.
                        </p>
                        <Link to="/" className="btn about-btn mb-5">CHECK AVAILABILITY</Link>
                    </div>
                    <div className="col-md-6">
                        <img src="https://cdn.pixabay.com/photo/2016/11/18/13/02/bed-1834327_1280.jpg" alt="bd hotel rooms" />
                    </div>
                </div>

                <div className="row d-flex justify-content-center align-items-center mb-5">
                    <div className="col-md-6">
                        <img src="https://cdn.pixabay.com/photo/2018/06/14/21/15/bedroom-3475656_1280.jpg" alt="bd hotel rooms" />
                    </div>
                    <div className="col-md-6">
                        <h2>COSY ROOM</h2>
                        <p className="about-text">
                            These websites provide a wide range of options including hotels, guesthouses, hostels and vacations rentals in various locations accross the world.
                        </p>
                        <Link to="/" className="btn about-btn">CHECK AVAILABILITY</Link>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default OurRooms;