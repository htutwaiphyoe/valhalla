import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import ButtonLoader from "../ButtonLoader/ButtonLoader";

import { resetPassword, clearError } from "../../redux/actions/userActions";
const ResetPassword = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { error, loading, message } = useSelector((state) => state.resetPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    useEffect(() => {
        if (message) {
            toast.success(message);
            router.replace("/login");
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, error, message]);
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (password.trim() === "" || password.trim().length < 8) {
            toast.error("Password should have at least 8 characters");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        dispatch(
            resetPassword(router.query.token, {
                password,
                confirmPassword,
            })
        );

        setPassword("");
        setConfirmPassword("");
    };
    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={formSubmitHandler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            required={true}
                            min={8}
                            onChange={(e) => setPassword(e.target.value.trim())}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            required={true}
                            min={8}
                            onChange={(e) => setConfirmPassword(e.target.value.trim())}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}
                    >
                        {loading ? <ButtonLoader /> : "CHANGE PASSWORD"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
