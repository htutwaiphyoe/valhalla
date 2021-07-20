import { getSession } from "next-auth/client";

import Bookings from "../../components/booking/Bookings";
import Meta from "../../components/Layout/Meta/Meta";
import wrapper from "../../redux/store";
import { getMyBookings } from "../../redux/actions/bookingActions";

const BookingsPage = (props) => {
    return (
        <>
            <Meta title="Bookings - Hotel Valhalla" description="A list of bookings" />
            <Bookings />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store }) => {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    await store.dispatch(getMyBookings(req.headers.cookie));
});
export default BookingsPage;
