import { getSession } from "next-auth/client";

import NewRoom from "../../../components/admin/NewRoom";
import Meta from "../../../components/Layout/Meta/Meta";

const NewRoomPage = (props) => {
    return (
        <>
            <Meta title="New room - Hotel Valhalla" />
            <NewRoom />
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
export default NewRoomPage;
