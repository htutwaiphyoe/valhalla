import { getSession } from "next-auth/client";

import AllBookings from "../../../components/admin/AllBookings";
import Meta from "../../../components/Layout/Meta/Meta";

const AllBookingsPage = (props) => {
    return (
        <>
            <Meta title="All Bookings - Hotel Valhalla" />
            <AllBookings />
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
export default AllBookingsPage;
