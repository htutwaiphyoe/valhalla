import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import validator from "validator";

import { clearError, forgotPassword } from "../../redux/actions/userActions";

import ButtonLoader from "../ButtonLoader/ButtonLoader";
const ForgotPassword = (props) => {
    const dispatch = useDispatch();
    const { error, message, loading } = useSelector((state) => state.forgotPassword);
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (message) {
            toast.success(message);
        }
    }, [dispatch, error, message]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!email.trim() || !validator.isEmail(email)) {
            toast.error("Invalid email");
            return;
        }
        dispatch(
            forgotPassword({
                email,
            })
        );
    };
    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={formSubmitHandler}>
                    <h1 className="mb-3">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}
                    >
                        {loading ? <ButtonLoader /> : "SEND EMAIL"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
