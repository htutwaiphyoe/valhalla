import NotFound from "../components/NotFound/NotFound";
import Meta from "../components/Layout/Meta/Meta";
const NotFoundPage = (props) => {
    return (
        <>
            <Meta
                title="Page Not Found - Hotel Valhalla"
                description="Book now to spend your special holidays with best hotels"
            />
            <NotFound />
        </>
    );
};

export default NotFoundPage;
