import { getSession } from "next-auth/client";

import AllReviews from "../../../components/admin/AllReviews";
import Meta from "../../../components/Layout/Meta/Meta";

const AllReviewsPage = (props) => {
    return (
        <>
            <Meta title="All reviews - Hotel Valhalla" />
            <AllReviews />
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
export default AllReviewsPage;
