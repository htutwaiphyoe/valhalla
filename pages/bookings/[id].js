import { getSession } from "next-auth/client";

import BookingDetails from "../../components/booking/BookingDetails";
import wrapper from "../../redux/store";
import { getBookingDetails } from "../../redux/actions/bookingActions";

const BookingDetailsPage = (props) => {
    return (
        <>
            <BookingDetails />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store, params }) => {
    const session = await getSession({ req });

    if (!session) {
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
