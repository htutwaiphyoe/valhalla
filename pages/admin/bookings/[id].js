import { getSession } from "next-auth/client";

import BookingDetails from "../../../components/booking/BookingDetails";
import Meta from "../../../components/Layout/Meta/Meta";
import wrapper from "../../../redux/store";
import { getBookingDetails } from "../../../redux/actions/bookingActions";

const BookingDetailsPage = (props) => {
    return (
        <>
            <Meta title="Booking Details" />
            <BookingDetails />
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

    await store.dispatch(getBookingDetails(req.headers.cookie, params.id));
});
export default BookingDetailsPage;
