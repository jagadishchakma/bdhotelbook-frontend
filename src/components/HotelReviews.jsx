import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utility/AuthContext';
import api, { authapi } from '../utility/api';
import { format } from 'date-fns';
import '../assets/css/review.css';


const HotelReviews = ({ slug, hotel }) => {
    const [reviews, setReviews] = useState('');
    const [reload, setReload] = useState(0);
    const [editMode, setEditMode] = useState({ id: 0, edit: false });
    const [countStar, setCountStar] = useState(0);
    const [comment, setComment] = useState('');
    const [updateComment, setUpdateComment] = useState('');
    const [rating, setRating] = useState({
        star1: false,
        star2: false,
        star3: false,
        star4: false,
        star5: false,
    });

    useEffect(() => {
        const reviewsGet = async () => {
            const response = await api.get(`hotel/reviews/${slug}/all/`)
            setReviews(response.data.results);
        }
        reviewsGet()
    }, [reload])
    const { user, setReloadUser, reloadUser } = useContext(AuthContext);

    const DateDisplay = (createdAt) => {
        const date = new Date(createdAt);
        const formattedDate = format(date, 'MMMM dd, yyyy hh:mm a');
        return formattedDate
    };

    //check room booked  user or not
    let isStayed = false;
    if (user) {
        const { profile: { room_booked } } = user;
        room_booked.map((item) => {
            if (item.room[0].hotel[0].slug == slug) {
                isStayed = true;
                return;
            }
        })
    }

    //star handler
    const starHandler = (star) => {
        if (star == 'star1') {
            setRating({ ...rating, star1: !rating.star1 })
            if (rating.star1) {
                setCountStar(countStar - 1)
            } else {
                setCountStar(countStar + 1)
            }
        }
        if (star == 'star2') {
            setRating({ ...rating, star2: !rating.star2 })
            if (rating.star2) {
                setCountStar(countStar - 1)
            } else {
                setCountStar(countStar + 1)
            }
        }
        if (star == 'star3') {
            setRating({ ...rating, star3: !rating.star3 })
            if (rating.star3) {
                setCountStar(countStar - 1)
            } else {
                setCountStar(countStar + 1)
            }
        }
        if (star == 'star4') {
            setRating({ ...rating, star4: !rating.star4 })
            if (rating.star4) {
                setCountStar(countStar - 1)
            } else {
                setCountStar(countStar + 1)
            }
        }
        if (star == 'star5') {
            setRating({ ...rating, star5: !rating.star5 })
            if (rating.star5) {
                setCountStar(countStar - 1)
            } else {
                setCountStar(countStar + 1)
            }
        }
    }

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

    //submit review form
    const reviewPost = async () => {
        const response = await authapi.post('hotel/reviews/', { rating: countStar, comment, slug: slug });
        setComment('');
        setCountStar(0);
        setRating({
            star1: false,
            star2: false,
            star3: false,
            star4: false,
            star5: false,
        })
        setReload(reload + 1);
        setReloadUser(reloadUser + 1);
    }
    //delete review
    const reviewDelete = async (id) => {
        const response = await authapi.delete(`hotel/reviews/${id}/`);
        setReload(reload + 1);
        setReloadUser(reloadUser + 1);
    }

    //update review
    const reviewUpdate = async (id) => {
        const response = await authapi.put(`hotel/reviews/${id}/`, { rating, comment: updateComment });
        setReload(reload + 1);
        setReloadUser(reloadUser + 1);
    }

    return (
        <div>
            {(reviews.length > 0 || isStayed) ? <h2 className="text-center reviews-headline headline">Reviews({reviews.length})</h2> : ""}
            <div className={isStayed ? "reviews" : reviews.length > 0 ? "reviews" : ""}>
                {
                    isStayed && (


                        <div className="review-form">
                            <h6>Write a review:</h6>
                            <ul className="d-flex justify-content-start align-items-center rating-star">
                                <li className={rating.star1 ? "star-color" : ""}><i className="bi bi-star-fill" onClick={() => starHandler('star1')}></i></li>
                                <li className={rating.star2 ? "star-color" : ""}><i className="bi bi-star-fill" onClick={() => starHandler('star2')}></i></li>
                                <li className={rating.star3 ? "star-color" : ""}><i className="bi bi-star-fill" onClick={() => starHandler('star3')}></i></li>
                                <li className={rating.star4 ? "star-color" : ""}><i className="bi bi-star-fill" onClick={() => starHandler('star4')}></i></li>
                                <li className={rating.star5 ? "star-color" : ""}><i className="bi bi-star-fill" onClick={() => starHandler('star5')}></i></li>
                            </ul>
                            <div>
                                <textarea className="form-control" id="comment-box" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                <input type="submit" value="Submit" className="btn btn-danger mt-2" onClick={reviewPost} />
                            </div>

                        </div>

                    )
                }

                <div className="review-holder">
                    {
                        reviews && reviews.map((review) => (
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
        </div>
    );
}
export default HotelReviews;