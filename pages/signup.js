import Layout from "../components/Layout/Layout";
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

export default SignupPage;
