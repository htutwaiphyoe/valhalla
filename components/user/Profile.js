import { useState, useEffect, useCallback } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { updateUserProfile, clearError } from "../../redux/actions/userActions";
import { signOut } from "next-auth/client";

import ButtonLoader from "../ButtonLoader/ButtonLoader";

const Profile = (props) => {
    const { user } = props;
    const [fullName, setFullName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, message, error } = useSelector((state) => state.updateUser);

    const logout = useCallback(async () => {
        await signOut({ redirect: false, callbackUrl: "/login" });
        router.replace("/login");
    }, []);
    useEffect(() => {
        if (message) {
            toast.success(message);
            logout();
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, message, error, logout]);
    const avatarChangeHandler = (e) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                setAvatar(fileReader.result);
                setAvatarPreview(fileReader.result);
            }
        };

        fileReader.readAsDataURL(e.target.files[0]);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const isInputValid =
            !fullName.trim() || !email || !validator.isEmail(email) || fullName.trim().length > 50;
        if (isInputValid) {
            toast.error("Please enter valid data");
            return;
        }
        const pass = password.trim();

        if (pass !== "") {
            if (pass.length < 8) {
                toast.error("password must be at least 8 characters.");
                return;
            }
        }

        dispatch(
            updateUserProfile({
                name: fullName,
                email,
                password,
                avatar,
            })
        );
    };
    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-12 col-lg-5">
                    <form className="shadow-lg" onSubmit={onSubmitHandler}>
                        <h1 className="mb-3">Update profile</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Full Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value.trim())}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img
                                            src={avatarPreview}
                                            className="rounded-circle"
                                            alt="image"
                                        />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={avatarChangeHandler}
                                        accept="image/*"
                                        disabled={loading}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        {avatar ? "Avatar is chosen" : "Choose Avatar"}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
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

export default Profile;
