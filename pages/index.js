import Layout from "../components/Layout/Layout";
import Home from "../components/Home/Home";

import { getRooms } from "../redux/actions/roomActions";
import wrapper from "../redux/store";
const HomePage = () => {
    return (
        <Layout
            title="Hotel Valhalla"
            description="Hotel Valhalla - Book now to spend your special holidays with best hotels"
        >
            <Home />
        </Layout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(getRooms());
});
export default HomePage;
