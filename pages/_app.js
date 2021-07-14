import "../styles/global.css";
import wrapper from "../redux/store";
import Layout from "../components/Layout/Layout";

const App = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default wrapper.withRedux(App);
