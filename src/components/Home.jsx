import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import api from '../utility/api';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import FAQ from './home/FAQ';
import '../assets/css/home.css';
import Service from './home/Service';
import Background from './home/Background';

const Home = () => {
    const [district, setDistrict] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getDistrict = async () => {
            setLoading(true);
            const response = await api.get("hotel/districts/");
            setDistrict(response.data);
            setLoading(false);
        }
        getDistrict();
    }, [])
    const districts = district.map((item) => {
        return (
            <div className="col-md-3" key={item.id} >
                <Link to={`hotels/${item.slug}`}>
                    <div className="district">
                        <img src={`https://hotel-booking-backend-vvsl.onrender.com/${item.image}`} alt="" width="100%" />
                        <span>{item.name}</span>
                    </div>
                </Link>
            </div>
        )
    });
    return (
        <div className="container mt-5 main">
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="This is the home page description." />
                <meta name="keywords" content="hotel-booking, bangaldesh hotel tourist, hotel book" />
            </Helmet>

            {
                loading ? <Loading /> : (
                    <>
                        <div className="home-background">
                            <Background/>
                        </div>
                        <div className="destination">
                            <div className="desti-headline">
                                <h1 className="text-center">Find Your Destinations</h1>
                                <div className="line-box">
                                    <span className="first"></span>
                                    <span className="second"></span>
                                    <span className="third"></span>
                                </div>
                            </div>
                            <div className="row">
                                {districts}
                            </div>
                        </div>
                        <div className="services">
                            <Service/>
                        </div>
                        <div className="faq">
                            <FAQ />
                        </div>
                    </>
                )
            }

        </div>
    );
};

export default Home;