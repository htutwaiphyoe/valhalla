import { getSession } from "next-auth/client";

const ProfilePage = (props) => {
    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
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
