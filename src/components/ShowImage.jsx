const ShowImage = ({image,toggle}) => {
    return (
        <div className="imageShowModal">
                <div className="modal fade" id="imageShowModal" tabIndex="-1" aria-labelledby="imageShowModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body single-image">
                                <img src={image} alt="hotel image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ShowImage;