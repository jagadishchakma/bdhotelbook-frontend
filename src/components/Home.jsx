import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import api from '../utility/api';
import { Link } from 'react-router-dom';
import Loading from './Loading';

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
                    <div className="row">
                        {districts}
                    </div>
                )
            }

        </div>
    );
};

export default Home;