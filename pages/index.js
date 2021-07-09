import Layout from "../components/Layout/Layout";
import Home from "../components/Home/Home";

import { getRooms } from "../redux/actions/roomActions";
import wrapper from "../redux/store";
const HomePage = () => {
    return (
        <Layout>
            <Home />
        </Layout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
    await store.dispatch(getRooms(query.page, query.location, query.guestCapacity, query.category));
});
export default HomePage;
