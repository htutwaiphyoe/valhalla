import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

import ButtonLoader from "../ButtonLoader/ButtonLoader";
import { updateUserByAdmin, resetUpdateUser, clearError } from "../../redux/actions/adminActions";

const UpdateUser = (props) => {
    const { user, error: userDetailsError } = useSelector((state) => state.userDetails);
    const { loading, error, message } = useSelector((state) => state.update);

    const router = useRouter();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (userDetailsError) {
            toast.error(userDetailsError);
            dispatch(clearError());
        }

        if (message) {
            toast.success(message);
            dispatch(resetUpdateUser());
            router.push("/admin/users");
        }
    }, [dispatch, error, message, userDetailsError]);
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name || !email || !validator.isEmail(email) || !role) {
            return toast.error("Invalid input data");
        }
        dispatch(
            updateUserByAdmin(router.query.id, {
                name,
                email,
                role,
            })
        );
    };

    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-12 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update User</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role_field">Role</label>

                            <select
                                id="role_field"
                                className="form-control"
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading}
                        >
                            {loading ? <ButtonLoader /> : "UPDATE"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
