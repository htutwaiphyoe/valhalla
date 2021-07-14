import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";

import { loadUser } from "../../redux/actions/userActions";
const Navigation = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, loading } = useSelector((state) => state.loggedInUser);

    useEffect(() => {
        if (!user) {
            dispatch(loadUser());
        }
    }, [dispatch, user]);

    const logoutHandler = async () => {
        // logout without page reload and redirect to "/"
        const data = await signOut({ redirect: false, callbackUrl: "/" });
        router.replace(data.url);
    };
    return (
        <header className="sticky-top">
            <nav className="navbar row justify-content-center">
                <div className="container">
                    <div className="col-3 p-0">
                        <div className="navbar-brand">
                            <Link href="/">
                                <a className="brand-name">Valhalla</a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-6 col-md-3 mt-md-0 text-right">
                        {user ? (
                            <div className="dropdown d-line">
                                <a
                                    className="btn dropdown-toggle"
                                    id="dropDownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <figure className="avatar avatar-nav">
                                        <img
                                            src={user.avatar.url}
                                            alt={user.name}
                                            className="rounded-circle"
                                        />
                                    </figure>
                                    <span>{user.name}</span>
                                </a>

                                <div
                                    className="dropdown-menu"
                                    style={{ right: "0", minWidth: "5rem" }}
                                    aria-labelledby="dropDownMenuButton"
                                >
                                    <Link href="/bookings/me">
                                        <a className="dropdown-item">Bookings</a>
                                    </Link>

                                    <Link href="/me/update">
                                        <a className="dropdown-item">Profile</a>
                                    </Link>

                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            !loading && (
                                <Link href="/login">
                                    <a className="btn btn-danger px-3 text-white login-header-btn float-right">
                                        Login
                                    </a>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;
