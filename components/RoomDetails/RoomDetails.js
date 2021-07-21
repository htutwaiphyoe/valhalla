import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/client";

import { clearErrors } from "../../redux/actions/roomActions";
import {
    checkBooking,
    getBookedDates,
    checkBookingReset,
} from "../../redux/actions/bookingActions";
import valhallaAxios from "../../utils/valhallaAxios";
import getStripe from "../../utils/getStripe";

import RoomFeatures from "./RoomFeatures";
import NewReview from "../review/NewReview";
import Meta from "../Layout/Meta/Meta";

const RoomDetails = (props) => {
    const [session, loading] = useSession();
    const dispatch = useDispatch();
    const router = useRouter();

    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [daysOfStay, setDaysOfStay] = useState();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const { room, error } = useSelector((state) => state.roomDetails);
    const { bookedDates } = useSelector((state) => state.bookedDates);
    const {
        loading: bookingLoading,
        error: bookingError,
        isAvailable,
    } = useSelector((state) => state.checkBooking);

    useEffect(() => {
        if (bookingError) toast.error(bookingError);
        if (error) toast.error(error);
        dispatch(clearErrors());
    }, [error, bookingError]);

    useEffect(() => {
        dispatch(getBookedDates(router.query.id));
        return () => {
            dispatch(checkBookingReset());
        };
    }, []);

    const dateChangeHandler = (dates) => {
        const [checkIn, checkOut] = dates;
        setCheckInDate(checkIn);
        setCheckOutDate(checkOut);

        if (checkIn && checkOut) {
            const days = Math.floor((new Date(checkOut) - new Date(checkIn)) / 86400000) + 1;
            setDaysOfStay(days);

            dispatch(checkBooking(router.query.id, checkIn, checkOut));
        }
    };

    const bookingHandler = async (id, pricePerNight) => {
        setPaymentLoading(true);

        try {
            const response = await valhallaAxios.get(
                `/api/checkout/${id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&daysOfStay=${daysOfStay}`,
                {
                    params: {
                        amount: daysOfStay * pricePerNight,
                    },
                }
            );

            const stripe = await getStripe();

            // redirect to checkout page
            await stripe.redirectToCheckout({ sessionId: response.data.session.id });

            setPaymentLoading(false);
        } catch (err) {
            setPaymentLoading(false);
            toast.error(err.message);
        }
    };
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
                            <p className="mt-5 mb-3">Pick check in and check out dates</p>

                            <DatePicker
                                className="w-100"
                                selected={checkInDate}
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                minDate={new Date()}
                                excludeDates={bookedDates.map((date) => new Date(date))}
                                selectsRange
                                inline
                                onChange={dateChangeHandler}
                            />

                            {isAvailable === true && (
                                <div className="alert alert-success my-3 font-weight-bold">
                                    Room is available. Book now.
                                </div>
                            )}

                            {isAvailable === false && (
                                <div className="alert alert-danger my-3 font-weight-bold">
                                    Room not available. Try different dates.
                                </div>
                            )}

                            {isAvailable && !session && (
                                <button
                                    className="btn btn-block py-3 booking-btn"
                                    onClick={() => router.push("/login")}
                                >
                                    Login to book
                                </button>
                            )}

                            {isAvailable && session && (
                                <button
                                    className="btn btn-block py-3 booking-btn"
                                    onClick={() => bookingHandler(room._id, room.pricePerNight)}
                                    disabled={bookingLoading || paymentLoading}
                                >
                                    Pay - ${daysOfStay * room.pricePerNight}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <NewReview />

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

// const bookingHandler = async () => {
//         const bookingData = {
//             room: router.query.id,
//             checkInDate,
//             checkOutDate,
//             daysOfStay,
//             amountPaid: 90,
//             paymentInfo: {
//                 id: "PAYMENT_ID",
//                 status: "PAYMENT_STATUS",
//             },
//         };
//         try {
//             const response = await valhallaAxios.post("/api/bookings", bookingData, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             console.log(response.data);
//         } catch (err) {
//             console.log(err.response.data);
//         }
//     };
