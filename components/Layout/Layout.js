import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Meta from "./Meta/Meta";

const Layout = (props) => {
    return (
        <Fragment>
            <Meta title={props.title} description={props.description} />
            <Navigation />
            <main>{props.children}</main>
            <ToastContainer position="bottom-right" />
            <Footer />
        </Fragment>
    );
};

export default Layout;
