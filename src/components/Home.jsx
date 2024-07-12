import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import api from '../utility/api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [district, setDistrict] = useState([]);
    useEffect(() => {
        const getDistrict = async () => {
            const response = await api.get("hotel/districts/");
            setDistrict(response.data)
        }
        getDistrict()
    }, [])
    const districts = district.map((item) => {
        return (
            <div className="col-md-3" key={item.id} >
                <Link to={`hotels/${item.slug}`}>
                    <div className="district">
                        <img src={`http://127.0.0.1:8000${item.image}`} alt="" width="100%" />
                        <span>{item.name}</span>
                    </div>
                </Link>
            </div>
        )
    })
    return (
        <div className="container mt-5 main">
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="This is the home page description." />
                <meta name="keywords" content="hotel-booking, bangaldesh hotel tourist, hotel book" />
            </Helmet>
            <div className="row">
                {districts}
            </div>
        </div>
    );
};

export default Home;