import { Fragment } from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Layout = (props) => {
    return (
        <Fragment>
            <Navigation />
            <main>{props.children}</main>
            <Footer />
        </Fragment>
    );
};

export default Layout;
