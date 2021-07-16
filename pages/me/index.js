import { getSession } from "next-auth/client";

import Profile from "../../components/user/Profile";

const ProfilePage = (props) => {
    return <Profile user={props.session.user} />;
};

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req });
    if (!session) {
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
export default ProfilePage;
