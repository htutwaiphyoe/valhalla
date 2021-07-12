import { useState } from "react";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import validator from "validator";
import Link from "next/link";

import Meta from "../Layout/Meta/Meta";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const Login = (props) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim() || !validator.isEmail(email) || password.length < 8) {
            toast.error("Please enter valid email and password.");

            return;
        }
        setLoading(true);

        const result = await signIn("credentials", {
            // stay in Login Page if login fail
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (result.error) {
            toast.error(result.error);
            setEmail("");
            setPassword("");
        } else {
            router.replace("/");
        }
    };
    return (
        <>
            <Meta title="Login - Hotel Valhalla" description="Login to book our best rooms" />
            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-12 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">Login</h1>
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

                            <a href="#" className="float-right mb-4">
                                Forgot Password?
                            </a>

                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading}
                            >
                                {loading ? <ButtonLoader /> : "LOGIN"}
                            </button>

                            <Link href="/signup">
                                <a className="float-right mt-3">New User?</a>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
