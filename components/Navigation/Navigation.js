const Navigation = (props) => {
    return (
        <header className="sticky-top">
            <nav className="navbar row justify-content-center">
                <div className="container">
                    <div className="col-3 p-0">
                        <div className="navbar-brand brand-name">Valhalla</div>
                    </div>

                    <div className="col-3 mt-3 mt-md-0 text-center">
                        <a className="btn btn-danger px-4 text-white login-header-btn float-right">
                            Login
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;
