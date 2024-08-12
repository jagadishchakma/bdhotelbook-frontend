import indicator from '../../assets/images/indicator.png'
import food from '../../assets/images/food.png'
import security from '../../assets/images/security.png'
import quick from '../../assets/images/quick.png'
import support from '../../assets/images/support.png'
const Service = () => {
    return (
        <div className="container">
            <div className="desti-headline">
                <h1 className="text-center">See our Services</h1>
                <div className="line-box">
                    <span className="first"></span>
                    <span className="second"></span>
                    <span className="third"></span>
                </div>
            </div>
            <div className="services">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-6">
                                <ul className="d-flex align-items-center justify-content-center gap-3">
                                    <li><img src={food} alt="food" width="50" /></li>
                                    <li>Quality Food</li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="d-flex align-items-center justify-content-center gap-3">
                                    <li><img src={security} alt="security" width="50" /></li>
                                    <li>High Security</li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="d-flex align-items-center justify-content-center gap-3">
                                    <li><img src={quick} alt="quick service" width="50" /></li>
                                    <li>Quick Service</li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="d-flex align-items-center justify-content-center gap-3">
                                    <li><img src={support} alt="quick service" width="50" /></li>
                                    <li>24 Hours Support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <img src={indicator} alt="indicator" width="300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;