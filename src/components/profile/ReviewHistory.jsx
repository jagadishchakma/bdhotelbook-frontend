import { useContext, useState } from "react";
import { AuthContext } from "../../utility/AuthContext";
import { authapi } from "../../utility/api";



const ReviewHistory = () => {
    const [editMode, setEditMode] = useState({ id: 0, edit: false });
    const [updateComment, setUpdateComment] = useState('');

    const { user,setReloadUser,reloadUser } = useContext(AuthContext);


  
    //load rating
    const loadRating = (rating_count)=>{
        const elements = [];
        for(let i=1; i <= rating_count; i++){
            elements.push(
                <li className="star-color" key={i}><i className="bi bi-star-fill"></i></li>
            )
        }
        return elements;
    }


    //delete review
    const reviewDelete = async (id) => {
        const response = await authapi.delete(`hotel/reviews/${id}/`);
        setReloadUser(reloadUser+1);
    }

    //update review
    const reviewUpdate = async (id, review_rating) => {
        const response = await authapi.put(`hotel/reviews/${id}/`, {rating:review_rating,comment:updateComment});
        setReloadUser(reloadUser+1);
    }

    return (
        <>
           <h2 className="text-success">Your reviews</h2>
            <div>
                {
                    user && user.review.map((review) => (
                        <div className="card review-card" key={review.id}>
                            <div className="card-header">
                                <p className="card-title">{review.user.username}</p>
                                <ul className="d-flex justify-content-start align-items-center rating-star">
                                    {loadRating(review.rating)}
                                </ul>
                            </div>
                            <div className={(editMode.id == review.id && editMode.edit == true) ? "card-body-edit" : "card-body"}>
                                {
                                    (editMode.id == review.id && editMode.edit == true) ? (
                                        <textarea id="edit-comment-box" value={updateComment?updateComment:review.comment} onChange={(e) => setUpdateComment(e.target.value)}></textarea>
                                    ) : (
                                        <p>{review.comment}</p>
                                    )
                                }

                            </div>
                            <div className="card-footer">
                                {
                                    (editMode.id == review.id && editMode.edit == true) ? (
                                        <>
                                            <button className="btn btn-outline-info" onClick={()=>{
                                                reviewUpdate(review.id, review.rating)
                                                setEditMode({ id: review.id, edit: false })
                                                setUpdateComment('')
        
                                            }}>Update</button>
                                            <button className="btn btn-outline-danger ms-3" onClick={() => {
                                                setEditMode({ id: review.id, edit: false })
                                                setUpdateComment('')
                                               
                                            }}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-outline-info" onClick={() => {
                                                 setEditMode({ id: review.id, edit: true })
                                                 setUpdateComment(review.comment)
                                                 
                                            }}>Edit</button>
                                            <button className="btn btn-outline-danger ms-3" onClick={() => reviewDelete(review.id)}>Delete</button>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    );
};

export default ReviewHistory;