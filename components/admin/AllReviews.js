import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../ui/Loader/Loader";
import { getAllReviewsByAdmin, clearError } from "../../redux/actions/adminActions";

const AllRooms = (props) => {
    const dispatch = useDispatch();

    const { reviews, error, loading } = useSelector((state) => state.allReviews);
    // const {
    //     message,
    //     error: deleteRoomError,
    //     loading: deleteRoomLoading,
    // } = useSelector((state) => state.delete);

    useEffect(() => {
        dispatch(getAllReviewsByAdmin());
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        // if (message) {
        //     toast.success(message);
        //     dispatch(resetDeleteRoom());
        // }
        // if (deleteRoomError) {
        //     toast.error(deleteRoomError);
        //     dispatch(clearError());
        // }
    }, [dispatch, error]);

    // const buttonClickHandler = (id) => {
    //     dispatch(deleteRoomByAdmin(id));
    // };

    return (
        <div className="container container-fluid overflow-auto">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="d-flex justify-content-between">
                        <h1 className="my-4">{reviews.length} reviews</h1>
                    </div>
                    <table className="table table-striped w-100 overflow-auto">
                        <thead style={{ color: "#fff", backgroundColor: "hsl(250, 69%, 61%)" }}>
                            <tr>
                                <th scope="col">Review Id</th>
                                <th scope="col" className="d-none d-lg-table-cell">
                                    Room name
                                </th>
                                <th scope="col" className="d-none d-md-table-cell">
                                    User name
                                </th>
                                <th scope="col" className="d-none d-md-table-cell">
                                    Rating
                                </th>
                                <th scope="col" className="d-none d-md-table-cell">
                                    Comment
                                </th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews &&
                                reviews.map((review) => (
                                    <tr key={review.data._id}>
                                        <td style={{ fontSize: "12.5px" }}>{review.data._id}</td>
                                        <td className="d-none d-lg-table-cell">{`${review.roomName}`}</td>
                                        <td className="d-none d-md-table-cell">{`${review.data.name}`}</td>
                                        <td className="d-none d-md-table-cell">{`${review.data.rating}`}</td>
                                        <td className="d-none d-md-table-cell">{`${review.data.comment}`}</td>

                                        <td>
                                            <button
                                                className="btn btn-danger ml-2"
                                                // onClick={() => buttonClickHandler(room._id)}
                                                // disabled={deleteRoomLoading}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AllRooms;
