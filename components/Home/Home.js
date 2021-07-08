import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";

import RoomItem from "./RoomItem/RoomItem";
import Meta from "../Layout/Meta/Meta";

import { clearErrors } from "../../redux/actions/roomActions";

const Home = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { rooms, error, total, limit } = useSelector((state) => state.allRooms);
    const { page = 1 } = router.query;

    useEffect(() => {
        toast.error(error);
        dispatch(clearErrors());
    }, [error]);

    const handlePagination = (pageNumber) => {
        router.push(`/?page=${pageNumber}`);
    };

    return (
        <>
            <Meta
                title="Hotel Valhalla"
                description="Book now to spend your special holidays with best hotels"
            />
            <section id="rooms" className="container mt-5">
                <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>
                <a href="#" className="ml-2 back-to-search">
                    <i className="fa fa-arrow-left"></i> Back to Search
                </a>
                <div className="row">
                    {rooms && rooms.length === 0 ? (
                        <div className="w-50 m-auto">
                            <div className="alert alert-danger my-4 text-center">
                                <em>No rooms available</em>
                            </div>
                        </div>
                    ) : (
                        rooms.map((room) => <RoomItem key={room._id} room={room} />)
                    )}
                </div>
            </section>

            <div className="d-flex justify-content-center mt-3">
                <Pagination
                    activePage={+page}
                    itemsCountPerPage={limit}
                    totalItemsCount={total}
                    onChange={handlePagination}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                />
            </div>
        </>
    );
};

export default Home;
