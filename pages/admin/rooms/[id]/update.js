import { getSession } from "next-auth/client";

import UpdateRoom from "../../../../components/admin/UpdateRoom";
import Meta from "../../../../components/Layout/Meta/Meta";
import wrapper from "../../../../redux/store";
import { getRoomDetails } from "../../../../redux/actions/roomActions";

const UpdateRoomPage = (props) => {
    return (
        <>
            <Meta title="Update room - Hotel Valhalla" />
            <UpdateRoom />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store, params }) => {
    const session = await getSession({ req });
    if (!session || session.user.role !== "admin") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    await store.dispatch(getRoomDetails(params.id));
});
export default UpdateRoomPage;
