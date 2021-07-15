import { getSession } from "next-auth/client";

import Signup from "../components/auth/Signup";
import Meta from "../components/Layout/Meta/Meta";

const SignupPage = (props) => {
    return (
        <>
            <Meta
                title="Signup - Hotel Valhalla"
                description="Make an account to book our best rooms"
            />
            <Signup />
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
export default SignupPage;
