import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Carousel } from "react-bootstrap";
import Image from "next/image";

import { clearErrors } from "../../redux/actions/roomActions";

import RoomFeatures from "./RoomFeatures";
import Meta from "../Layout/Meta/Meta";

const RoomDetails = (props) => {
    const { room, error } = useSelector((state) => state.roomDetails);
    const dispatch = useDispatch();
    useEffect(() => {
        toast.error(error);
        dispatch(clearErrors());
    }, [error]);

    return (
        <>
            <Meta title={`${room.name} - Hotel Valhalla`} description={`${room.description}`} />

            <div className="container container-fluid">
                <h2 className="mt-5">{room.name}</h2>
                <p>{room.address}</p>
                <div className="ratings mt-auto mb-3">
                    <div className="rating-outer">
                        <div
                            className="rating-inner"
                            style={{ width: `${(room.ratings / 5) * 100}%` }}
                        ></div>
                    </div>
                    <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
                </div>
                <Carousel hover="pause">
                    {room.images &&
                        room.images.map((image) => (
                            <Carousel.Item key={image.publicId}>
                                <div className="carousel-img">
                                    <Image
                                        className="d-block m-auto"
                                        src={image.url}
                                        alt={room.name}
                                        layout="fill"
                                    />
                                </div>
                            </Carousel.Item>
                        ))}
                </Carousel>

                <div className="row my-5">
                    <div className="col-12 col-md-6 col-lg-8">
                        <h3>Description</h3>
                        <p>{room.description}</p>

                        <RoomFeatures
                            guestCapacity={room.guestCapacity}
                            numOfBeds={room.numOfBeds}
                            breakfast={room.breakfast}
                            airConditioned={room.airConditioned}
                            internet={room.internet}
                            petsAllowed={room.petsAllowed}
                            roomCleaning={room.roomCleaning}
                        />
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="booking-card shadow-lg p-4">
                            <p className="price-per-night">
                                <b>${room.pricePerNight}</b> / night
                            </p>

                            <button className="btn btn-block py-3 booking-btn">Pay</button>
                        </div>
                    </div>
                </div>

                <div className="reviews w-75">
                    <h3>Reviews:</h3>
                    <hr />
                    <div className="review-card my-3">
                        <div className="rating-outer">
                            <div className="rating-inner"></div>
                        </div>
                        <p className="review_user">by John</p>
                        <p className="review_comment">Good Quality</p>

                        <hr />
                    </div>

                    <div className="review-card my-3">
                        <div className="rating-outer">
                            <div className="rating-inner"></div>
                        </div>
                        <p className="review_user">by John</p>
                        <p className="review_comment">Good Quality</p>

                        <hr />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoomDetails;
