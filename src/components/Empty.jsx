import React from 'react';

const Empty = () => {
    return (
        <div className="d-flex justify-content-center align-items-center empty-box">
            <div className="no-results d-flex justify-content-center align-items-center gap-3">
            <div><i className="bi bi-search"></i></div>
            <div><strong>No Results</strong></div>
        </div>
        </div>
    );
};

export default Empty;