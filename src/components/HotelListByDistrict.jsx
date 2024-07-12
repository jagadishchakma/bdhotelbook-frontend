import React, { useEffect, useState } from 'react';
import api from '../utility/api';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Empty from './Empty';

const HotelListByDistrict = () => {
    const [hotelDistrict, setHotelDistrict] = useState([]);
    const [districts, setDistricts] = useState('');
    const { slug } = useParams();
    useEffect(() => {
        const getHotelDistrict = async () => {
            const hotels = await api.get(`hotel/${slug}/`);
            setHotelDistrict(hotels.data);
            const district = await api.get('hotel/districts/');
            setDistricts(district.data)
        }
        getHotelDistrict();
    }, [slug])


    //display hotels
    const hotelsElement = hotelDistrict && hotelDistrict.map((hotel) => {
        return (
            <div className="row hotel-card" key={hotel.id}>
                <div className="col-md-4">
                    <div id={`carouselExample${hotel.id}`} className="carousel slide">
                        <div className="carousel-inner">
                            {
                                hotel.images.map((image) => {
                                    return (
                                        <div className={`carousel-item ${image.id == 1 ? 'active' : ''}`} key={image.id}>
                                            <img src={image.image} className="d-block w-100" alt={image.name} width="100%" height="280px" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExample${hotel.id}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExample${hotel.id}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-md-8 p-5">
                    <div>
                        <h2>{hotel.name}</h2>
                        <p>{hotel.room}</p>
                    </div>
                    <div>
                        <div>
                            <p>{hotel.address}</p>
                            <p>{hotel.distance}</p>
                        </div>
                        <div>
                            <Link to={`/hotel/${slug}/${hotel.slug}/`} className="btn btn-outline-info w-100">Visit</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="container mt-5 main mb-5">
            <Helmet>
                <title>{slug.toUpperCase()} hotels list</title>
                <meta name="description" content="This is the home page description." />
                <meta name="keywords" content="hotel-booking, bangaldesh hotel tourist, hotel book" />
            </Helmet>
            <div className="row">
                <div className="col-md-4">
                    {
                        districts && districts.map((district) => (
                            <div key={district.id}>
                                <Link to={`/hotels/${district.slug}`} className="d-flex justify-content-between district-nav" id={slug == district.slug?'district-nav-active':''}>
                                    {district.name.toUpperCase()}
                                    <i className="bi bi-arrow-right-circle"></i>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <div className="col-md-8">
                    {hotelDistrict.length > 0?hotelsElement:<Empty/>}
                </div>
            </div>
        </div>
    );
};

export default HotelListByDistrict;