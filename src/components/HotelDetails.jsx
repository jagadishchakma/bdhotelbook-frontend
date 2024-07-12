import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { authapi } from '../utility/api';
import { Helmet } from 'react-helmet';
import HotelReviews from './HotelReviews';
import { AuthContext } from '../utility/AuthContext';

const HotelDetails = () => {
    const [hotel, setHotel] = useState('');
    const [loading, setLoading] = useState(false);
    const [room_id, setRoomId] = useState(0);
    const { district, slug } = useParams();
    const { user } = useContext(AuthContext);


    useEffect(() => {
        const getHotel = async () => {
            const response = await api.get(`hotel/${district}/${slug}/`)
            setHotel(response.data[0])
        }
        getHotel()
    }, [])
    //room booked handling
    const HotelBookingHandler = async (room_slug, room_price, room_id) => {
        setRoomId(room_id);
        setLoading(true);
        if (room_price > user.profile.balance) {
            setLoading(false);
            setRoomId(0);
            alert('Your balance is unsufficient! please deposit')
            return
        }
        try {
            const response = await authapi.post(`hotel/room/booked/${room_slug}/`);
            window.location.reload();
            setLoading(false);
            setRoomId(0);
        } catch (error) {
            setLoading(false);
            setRoomId(0);
        }
    }
    let bookedMatch = false;

    return (
        <div className="container mt-5 main mb-5">
            <Helmet>
                <title>{hotel && hotel.name}</title>
                <meta name="description" content="This is the home page description." />
                <meta name="keywords" content="hotel-booking, bangaldesh hotel tourist, hotel book" />
            </Helmet>
            <div className="row">
                <div className="col-md-6">
                    <img src={hotel && hotel.images[0].image} alt={hotel && hotel.images[0].name} width="100%" />
                </div>
                <div className="col-md-6">
                    <div className="row" id="detail-pic">
                        {
                            hotel && hotel.images.length < 6 ? (
                                hotel.images.slice(1).map((item) => (
                                    <div className="col-md-6" key={item.id}>
                                        <img src={item.image} alt={item.name} width="100%" />
                                    </div>
                                ))
                            ) : (
                                hotel && hotel.images.slice(1, 5).map((item) => (
                                    <div className="col-md-6" key={item.id}>
                                        <img src={item.image} alt={item.name} width="100%" />
                                    </div>
                                ))
                            )
                        }

                        {
                            hotel && hotel.images.length >= 6 ? (
                                <span className="badge rounded-pill text-bg-success" id="more-pic"><i className="bi bi-images"></i> 5+</span>
                            ) : (
                                ""
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="overview">
                <h3 className="title">{hotel && hotel.name}</h3>
                <span>{hotel && hotel.district.name}</span>
                <p className="caption">Overview</p>

                <p className="address">{hotel && hotel.address}</p>
                <p className="description">{hotel && hotel.description}</p>
                <p className="distance">{hotel && hotel.distance}</p>
            </div>
            <div className="rooms row">
                {
                    hotel && hotel.rooms.map((room) => (
                        <div className="col-md-4" key={room.id}>
                            <div className="card h-100">
                                <div className="card-header">
                                    <div id={`carouselExample${room.id}`} className="carousel slide">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src={room.room_image[0].image} className="d-block w-100" alt={room.room_image[0].name} width="100%" height="280px" />
                                            </div>

                                            {
                                                room.room_image.slice(1).map((image) => {
                                                    return (
                                                        <div className="carousel-item" key={image.id}>
                                                            <img src={image.image} className="d-block w-100" alt={image.name} width="100%" height="280px" />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExample${room.id}`} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExample${room.id}`} data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h6>{room.room_name}</h6>
                                    <ul className="room-features">
                                        <li><i className="bi bi-slash-square"></i> Square: {room.room_sq}</li>
                                        <li><i className="bi bi-truck-flatbed"></i> Bed: {room.room_bed}</li>
                                        <li><i className="bi bi-tv"></i> Telivision: {room.room_television ? 'YES' : 'NO'}</li>
                                        <li><i className="bi bi-emoji-heart-eyes-fill"></i> View: {room.room_view}</li>
                                        <li><i className="bi bi-wifi"></i> Wifi: {room.room_wifi ? 'YES' : 'NO'}</li>
                                    </ul>


                                </div>

                                <div className="card-footer text-muted d-flex justify-content-between">
                                    {
                                        user && user.profile.room_booked.map((user_room) => (
                                            user_room.room[0].slug == room.slug && room.room_booked? bookedMatch = true:bookedMatch = false
                                        ))
                                    }
                                    {
                                        bookedMatch?(
                                            <>
                                                <button className="btn btn-primary" disabled>You Booked</button>
                                            </>
                                        ) : room.room_booked?(
                                            <>
                                                <button className="btn btn-primary" disabled>Unavailable</button>
                                            </>
                                        ):(
                                            <>
                                                {
                                                    loading && room_id == room.id ? (
                                                        <>
                                                            <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                                            <span role="status">Loading...</span>
                                                        </>
                                                    ) : (
                                                        <button className="btn btn-primary" onClick={() => HotelBookingHandler(room.slug, room.room_price, room.id)}>Book Now</button>
                                                    )
                                                }
                                            </>
                                        )
                                    }

                                    <p className="card-text price"> <strong>TK. {room.room_price}/</strong></p>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div>
                <HotelReviews slug={slug} hotel={hotel} />
            </div>
        </div>
    );
};

export default HotelDetails;