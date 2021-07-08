import Layout from "../../components/Layout/Layout";
import RoomDetails from "../../components/RoomDetails/RoomDetails";

import { getRoomDetails } from "../../redux/actions/roomActions";
import wrapper from "../../redux/store";

const RoomDetailsPage = (props) => {
    return (
        <Layout>
            <RoomDetails />
        </Layout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, params }) => {
    await store.dispatch(getRoomDetails(params.id));
});

export default RoomDetailsPage;
