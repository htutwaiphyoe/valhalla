import { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";

const Signup = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");

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
            !fullName ||
            !email ||
            !password ||
            !validator.isEmail(email) ||
            password.length < 8 ||
            fullName.length > 50;
        if (isInputValid) {
            toast.error("Please enter valid data, password must be at least 8 characters.");
            return;
        }
        console.log(fullName, email, password, avatar);
    };
    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-12 col-lg-5">
                    <form className="shadow-lg" onSubmit={onSubmitHandler}>
                        <h1 className="mb-3">Join Us</h1>

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
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
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
                                        required={true}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button id="login_button" type="submit" className="btn btn-block py-3">
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
