import { getSession } from "next-auth/client";

import AllRooms from "../../../components/admin/AllRooms";
import Meta from "../../../components/Layout/Meta/Meta";

const AllRoomsPage = (props) => {
    return (
        <>
            <Meta title="All rooms - Hotel Valhalla" />
            <AllRooms />
        </>
    );
};

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req });
    if (!session || session.user.role !== "admin") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}
export default AllRoomsPage;
