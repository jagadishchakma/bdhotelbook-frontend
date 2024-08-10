import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utility/AuthContext';
import { format } from 'date-fns';

const BookedHistory = () => {
    const [rooms, setRoom] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        let room_booked = user.profile.room_booked || [];
        let new_room = []
        room_booked.map((room) => {
            let cur_room = {...room.room, created_at: room.created_at}
            new_room.push(cur_room)
        })
        setRoom(new_room);
    }, [])

    const DateDisplay = (createdAt) => {
        const date = new Date(createdAt);
        const formattedDate = format(date, 'MMMM dd, yyyy hh:mm a');
        return formattedDate
    };

    return (
        <>
            <h2 className="text-success">Room Booked History </h2>
            <div className="row">
                {
                    rooms.length > 0 && rooms.map((room, id) => (
                        room[0] && (
                            <div className="col-md-4" key={id}>
                                <div className="card h-100">
                                    <img src={room[0].room_image[0].image} className="card-img-top" alt={room[0].room_name} width="100%" height="200px" />
                                    <div className="card-body">
                                        <h5 className="card-title">{room[0].room_name}</h5>
                                        <p className="card-text">{room[0].hotel[0].address}</p>
                                        <p><small><strong><i>Time: {DateDisplay(room.created_at)}</i></strong></small></p>
                                    </div>
                                    <div className="card-footer">
                                    <h5 className="card-title">{room[0].hotel[0].name}</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                }
            </div>
        </>
    );
};

export default BookedHistory;