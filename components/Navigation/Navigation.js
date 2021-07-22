import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
const Navigation = (props) => {
    const router = useRouter();
    const [session, loading] = useSession();

    const logoutHandler = async () => {
        // logout without page reload and redirect to "/"
        // signOut();
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
                        {session ? (
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
                                            src={session.user.avatar.url}
                                            alt={session.user.name}
                                            className="rounded-circle"
                                        />
                                    </figure>
                                    <span>{session.user.name.substring(0, 6)}</span>
                                </a>

                                <div
                                    className="dropdown-menu"
                                    style={{ right: "0", minWidth: "5rem" }}
                                    aria-labelledby="dropDownMenuButton"
                                >
                                    {session.user.role === "admin" && (
                                        <>
                                            <Link href="/admin/rooms">
                                                <a className="dropdown-item">All rooms</a>
                                            </Link>
                                            <hr />
                                        </>
                                    )}
                                    <Link href="/bookings">
                                        <a className="dropdown-item">Bookings</a>
                                    </Link>

                                    <Link href="/me">
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
                                    <a className="btn px-3 text-white login-header-btn float-right">
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
