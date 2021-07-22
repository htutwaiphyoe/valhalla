import { getSession } from "next-auth/client";

import AllUsers from "../../../components/admin/AllUsers";
import Meta from "../../../components/Layout/Meta/Meta";

const AllUsersPage = (props) => {
    return (
        <>
            <Meta title="All Users - Hotel Valhalla" />
            <AllUsers />
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
export default AllUsersPage;
