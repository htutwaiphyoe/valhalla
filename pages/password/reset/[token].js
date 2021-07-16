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

export default ResetPasswordPage;
