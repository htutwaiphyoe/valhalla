import { getSession } from "next-auth/client";

import ResetPassword from "../../../components/user/ResetPassword";
import Meta from "../../../components/Layout/Meta/Meta";

const ResetPasswordPage = (props) => {
    return (
        <>
            <Meta title="Reset Password - Hotel Valhalla" description="Reset your password" />
            <ResetPassword />
        </>
    );
};

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
export default ResetPasswordPage;
