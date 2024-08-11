import indicator from '../../assets/images/indicator.png'
import food from '../../assets/images/food.png'
import security from '../../assets/images/security.png'
import quick from '../../assets/images/quick.png'
import support from '../../assets/images/support.png'
const Service = () => {
    return (
        <div className="services">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="desti-headline">
                            <h1 className="text-center">See our Services</h1>
                            <div className="line-box">
                                <span className="first"></span>
                                <span className="second"></span>
                                <span className="third"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <ul className="d-flex align-items-center gap-3">
                                    <li><img src={food} alt="food" width="50" /></li>
                                    <li>Quality Food</li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="d-flex align-items-center gap-3">
                                    <li><img src={security} alt="security" width="50" /></li>
                                    <li>High Security</li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="d-flex align-items-center gap-3">
                                    <li><img src={quick} alt="quick service" width="50" /></li>
                                    <li>Quick Service</li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="d-flex align-items-center gap-3">
                                    <li><img src={support} alt="quick service" width="50" /></li>
                                    <li>24 Hours Support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src={indicator} alt="indicator" width="400"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;