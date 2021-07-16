import { getSession } from "next-auth/client";

import ForgotPassword from "../../components/user/ForgotPassword";
import Meta from "../../components/Layout/Meta/Meta";

const ForgotPasswordPage = (props) => {
    return (
        <>
            <Meta
                title="Forgot Password - Hotel Valhalla"
                description="Provide your account email to recover your account."
            />
            <ForgotPassword />
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
export default ForgotPasswordPage;
