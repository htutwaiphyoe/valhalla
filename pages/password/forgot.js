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

export default ForgotPasswordPage;
