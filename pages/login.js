import { getSession } from "next-auth/client";

import Login from "../components/auth/Login";

const LoginPage = (props) => {
    return <Login />;
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
export default LoginPage;
