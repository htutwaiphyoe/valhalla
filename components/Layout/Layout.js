import { Fragment } from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Meta from "./Meta/Meta";

const Layout = (props) => {
    return (
        <Fragment>
            <Meta title={props.title} description={props.description} />
            <Navigation />
            <main>{props.children}</main>
            <Footer />
        </Fragment>
    );
};

export default Layout;
