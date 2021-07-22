import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

import Loader from "../ui/Loader/Loader";
import { getAllRoomsByAdmin } from "../../redux/actions/adminActions";

const AllRooms = (props) => {
    const dispatch = useDispatch();

    const { rooms, error, loading } = useSelector((state) => state.allRoomsByAdmin);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, error]);

    useEffect(() => {
        dispatch(getAllRoomsByAdmin());
    }, []);

    return (
        <div className="container container-fluid overflow-auto">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h1 className="my-5">{rooms.length} Rooms</h1>

                    <table className="table table-striped w-100 overflow-auto">
                        <thead style={{ color: "#fff", backgroundColor: "hsl(250, 69%, 61%)" }}>
                            <tr>
                                <th scope="col">Room Id</th>
                                <th scope="col" className="d-none d-lg-table-cell">
                                    Name
                                </th>
                                <th scope="col" className="d-none d-md-table-cell">
                                    Price
                                </th>
                                <th scope="col" className="d-none d-md-table-cell">
                                    Category
                                </th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms &&
                                rooms.map((room) => (
                                    <tr key={room._id}>
                                        <td style={{ fontSize: "12.5px" }}>{room._id}</td>
                                        <td className="d-none d-lg-table-cell">{`${room.name}`}</td>
                                        <td className="d-none d-md-table-cell">{`$${room.pricePerNight}`}</td>
                                        <td className="d-none d-md-table-cell">{`${room.category}`}</td>

                                        <td>
                                            <>
                                                <Link href={`/admin/rooms/${room._id}`}>
                                                    <a className="btn btn-primary">
                                                        <i className="fa fa-pencil"></i>
                                                    </a>
                                                </Link>

                                                <button className="btn btn-danger ml-2">
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </>
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
