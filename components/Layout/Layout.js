import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Layout = (props) => {
    return (
        <>
            <Navigation />
            <main>{props.children}</main>
            <ToastContainer position="bottom-right" />
            <Footer />
        </>
    );
};

export default Layout;
