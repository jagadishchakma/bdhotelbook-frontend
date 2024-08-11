import Background from "./about/Background";
import '../assets/css/about.css';
import AboutUs from "./about/AboutUs";
import OurRooms from "./about/OurRooms";

const About = () => {
    return (
        <div className="about">
            <div className="main">
                <Background/>
                <div className="container">
                    <AboutUs/>
                    <OurRooms/>
                </div>
            </div>
        </div>
    );
};

export default About;