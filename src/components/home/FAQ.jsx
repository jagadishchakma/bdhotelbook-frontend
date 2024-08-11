import React from 'react';
import faqs from '../../fakedata/faqs.js';
import '../../assets/css/faq.css';

const FAQ = () => {
    return (
        <div className="mt-5">
            <div className="faq-headline">
                <h1 className="text-center">Frequently Asked and Questions</h1>
                <div className="line-box">
                    <span className="first"></span>
                    <span className="second"></span>
                    <span className="third"></span>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="accordion w-50" id="accordionExample">
                    {
                        faqs.map((faq) => (
                            <div className="accordion-item" key={faq.id}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${faq.id}`} aria-expanded="false" aria-controls={`collapse${faq.id}`}>
                                        {faq.aqs}
                                    </button>
                                </h2>
                                <div id={`collapse${faq.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {faq.ans}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FAQ;