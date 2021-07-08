import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

import RoomItem from "./RoomItem/RoomItem";
import Meta from "../Layout/Meta/Meta";

import { clearErrors } from "../../redux/actions/roomActions";

const Home = (props) => {
    const dispatch = useDispatch();
    const { rooms, error } = useSelector((state) => state.allRooms);

    useEffect(() => {
        toast.error(error);
        dispatch(clearErrors());
    }, [error]);

    return (
        <>
            <Meta
                title="Hotel Valhalla"
                description="Book now to spend your special holidays with best hotels"
            />
            <section id="rooms" className="container mt-5">
                <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>
                <a href="#" className="ml-2 back-to-search">
                    <i className="fa fa-arrow-left"></i> Back to Search
                </a>
                <div className="row">
                    {rooms && rooms.length === 0 ? (
                        <div className="alert alert-primary">
                            <em>No rooms available</em>
                        </div>
                    ) : (
                        rooms.map((room) => <RoomItem key={room._id} room={room} />)
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;
