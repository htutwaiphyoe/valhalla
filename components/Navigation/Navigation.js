import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadUser } from "../../redux/actions/userActions";
const Navigation = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.loggedInUser.user);
    console.log(user);
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);
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

                    <div className="col-3  mt-md-0 text-center">
                        <Link href="/login">
                            <a className="btn btn-danger px-3 text-white login-header-btn float-right">
                                Login
                            </a>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;
