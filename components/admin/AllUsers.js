import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

import Loader from "../ui/Loader/Loader";
import { getAllUsersByAdmin, clearError } from "../../redux/actions/adminActions";

const AllRooms = (props) => {
    const dispatch = useDispatch();

    const { users, error, loading } = useSelector((state) => state.allUsers);

    useEffect(() => {
        dispatch(getAllUsersByAdmin());
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, error]);

    return (
        <div className="container container-fluid overflow-auto">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="d-flex justify-content-between">
                        <h1 className="my-5">{users.length} users</h1>
                    </div>

                    <table className="table table-striped w-100 overflow-auto">
                        <thead style={{ color: "#fff", backgroundColor: "hsl(250, 69%, 61%)" }}>
                            <tr>
                                <th scope="col">User Id</th>
                                <th scope="col" className="d-none d-lg-table-cell">
                                    Name
                                </th>
                                <th scope="col" className="d-none d-md-table-cell">
                                    Email
                                </th>
                                <th scope="col" className="d-none d-md-table-cell">
                                    Role
                                </th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td style={{ fontSize: "12.5px" }}>{user._id}</td>
                                        <td className="d-none d-lg-table-cell">{`${user.name}`}</td>
                                        <td className="d-none d-md-table-cell">{`${user.email}`}</td>
                                        <td className="d-none d-md-table-cell">{`${user.role}`}</td>

                                        <td>
                                            <>
                                                <Link href={`/admin/users/${user._id}/update`}>
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
