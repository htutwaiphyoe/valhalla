import { Provider } from "next-auth/client";
import "../styles/global.css";
import wrapper from "../redux/store";
import Layout from "../components/Layout/Layout";

const App = ({ Component, pageProps }) => {
    return (
        <Provider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
};

export default wrapper.withRedux(App);
