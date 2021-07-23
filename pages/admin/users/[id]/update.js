import { getSession } from "next-auth/client";

import UpdateUser from "../../../../components/admin/UpdateUser";
import Meta from "../../../../components/Layout/Meta/Meta";
import wrapper from "../../../../redux/store";
import { getUserDetailsByAdmin } from "../../../../redux/actions/adminActions";

const UpdateUserPage = (props) => {
    return (
        <>
            <Meta title="Update user - Hotel Valhalla" />
            <UpdateUser />
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

    await store.dispatch(getUserDetailsByAdmin(req.headers.cookie, params.id));
});
export default UpdateUserPage;
