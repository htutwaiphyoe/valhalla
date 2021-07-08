import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Layout = (props) => {
    return (
        <Fragment>
            <Navigation />
            <main>{props.children}</main>
            <ToastContainer position="bottom-right" />
            <Footer />
        </Fragment>
    );
};

export default Layout;
