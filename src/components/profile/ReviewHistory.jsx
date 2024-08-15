import { useContext, useState } from "react";
import { AuthContext } from "../../utility/AuthContext";
import { authapi } from "../../utility/api";
import { format } from 'date-fns';
import NotFound from "./NotFound";



const ReviewHistory = () => {
    const [editMode, setEditMode] = useState({ id: 0, edit: false });
    const [updateComment, setUpdateComment] = useState('');
    const { user, setReloadUser, reloadUser } = useContext(AuthContext);



    //load rating
    const loadRating = (rating_count) => {
        const elements = [];
        for (let i = 1; i <= rating_count; i++) {
            elements.push(
                <li className="star-color" key={i}><i className="bi bi-star-fill"></i></li>
            )
        }
        return elements;
    }


    //delete review
    const reviewDelete = async (id) => {
        const response = await authapi.delete(`hotel/reviews/${id}/`);
        setReloadUser(reloadUser + 1);
    }

    //update review
    const reviewUpdate = async (id, review_rating) => {
        const response = await authapi.put(`hotel/reviews/${id}/`, { rating: review_rating, comment: updateComment });
        setReloadUser(reloadUser + 1);
    }

    const DateDisplay = (createdAt) => {
        const date = new Date(createdAt);
        const formattedDate = format(date, 'MMMM dd, yyyy hh:mm a');
        return formattedDate
    };

    const userReview = () => (
        <div className="profile-edit-bar shadow-sm review-holder">
            <h2 className="text-success ms-5">Your reviews</h2>
            <div className="mt-2">
                {
                    user && user.review.map((review) => (
                        <div className="review-card shadow-sm" key={review.id}>
                            <div className="row">
                                <div className="col-2">
                                    <img src={review.user.profile.image} alt={review.user.username} className="review-img" />
                                </div>
                                <div className="col-10">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="card-title">{review.user.first_name} {review.user.last_name}</p>
                                        </div>
                                        <div className="col-6">
                                            <div className="reviewer-info d-flex justify-content-end">
                                                <p className="review-date fs-6">{DateDisplay(review.created_at)}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className={(editMode.id == review.id && editMode.edit == true) ? "card-body-edit" : "card-body"}>
                                                {
                                                    (editMode.id == review.id && editMode.edit == true) ? (
                                                        <textarea id="edit-comment-box" value={updateComment} onChange={(e) => setUpdateComment(e.target.value)}></textarea>
                                                    ) : (
                                                        <p>{review.comment}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row d-flex justify-content-between">
                                <div className="col-md-2"></div>
                                <div className="col-6 col-md-5">
                                    {
                                        (editMode.id == review.id && editMode.edit == true) ? (
                                            <div className="card-footer">
                                                <button className="btn btn-outline-info" onClick={() => {
                                                    reviewUpdate(review.id)
                                                    setEditMode({ id: review.id, edit: false })
                                                    setUpdateComment('')
                                                    setRating(0)
                                                }}>Update</button>
                                                <button className="btn btn-outline-danger ms-3" onClick={() => {
                                                    setEditMode({ id: review.id, edit: false })
                                                    setUpdateComment('')
                                                    setRating(0)
                                                }}>Cancel</button>
                                            </div>
                                        ) : user && user.username == review.user.username ? (
                                            <div className="card-footer">
                                                <button className="btn" onClick={() => {
                                                    setEditMode({ id: review.id, edit: true })
                                                    setUpdateComment(review.comment)
                                                    setRating(review.rating)
                                                }}>Edit</button>
                                                <button className="btn ms-2" onClick={() => reviewDelete(review.id)}>Remove</button>
                                            </div>
                                        ) : ""
                                    }
                                </div>
                                <div className="col-6 col-md-5">
                                    <ul className="d-flex justify-content-end align-items-center rating-star">
                                        {loadRating(review.rating)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );

    if (user && user.review.length > 0) {
        return userReview();
    } else {
        return <NotFound />
    }
};

export default ReviewHistory;