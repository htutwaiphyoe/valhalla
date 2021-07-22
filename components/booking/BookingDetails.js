import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/client";

import { clearError } from "../../redux/actions/bookingActions";
const BookingDetails = (props) => {
    const dispatch = useDispatch();
    const [session, loading] = useSession();

    const { bookingDetails, error } = useSelector((state) => state.bookingDetails);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, error]);

    return (
        <div className="container mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-8 mt-3 booking-details">
                    {bookingDetails && (
                        <>
                            <h2 className="mt-2 mb-4 h5">Booking # {bookingDetails._id}</h2>

                            <h4 className="mb-4 h5">User Info</h4>
                            <p>
                                <b>Name:</b> {bookingDetails.user.name}
                            </p>
                            <p>
                                <b>Email:</b> {bookingDetails.user.email}
                            </p>
                            <p>
                                <b>Amount:</b> ${bookingDetails.amountPaid}
                            </p>

                            <hr />

                            <h4 className="mb-4 h5">Booking Info</h4>
                            <p>
                                <b>Check In: </b>
                                {new Date(bookingDetails.checkInDate).toLocaleString("en-US", {
                                    year: "numeric",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </p>
                            <p>
                                <b>Check Out: </b>
                                {new Date(bookingDetails.checkOutDate).toLocaleString("en-US", {
                                    year: "numeric",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </p>
                            <p>
                                <b>Days of Stay: </b>
                                {bookingDetails.daysOfStay}
                            </p>

                            <hr />

                            <h4 className="my-4 h5">Payment Status</h4>
                            <p className="greenColor">
                                <b>{bookingDetails.paymentInfo?.status}</b>
                            </p>

                            {session && session.user.role === "admin" && (
                                <p>
                                    <strong>ID: </strong>
                                    {bookingDetails.paymentInfo?.id}
                                </p>
                            )}

                            <h4 className="mt-5 mb-4 h5">Booked Room:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                <div className="row my-5">
                                    <div className="col-12 col-lg-2">
                                        <Image
                                            src={bookingDetails.room.images[0].url}
                                            alt={bookingDetails.room.name}
                                            height={180}
                                            width={250}
                                        />
                                    </div>

                                    <div className="col-12 col-lg-5">
                                        <Link href={`/room/${bookingDetails.room._id}`}>
                                            {bookingDetails.room.name}
                                        </Link>
                                    </div>

                                    <div className="col-6 col-lg-2 mt-4 mt-lg-0">
                                        <p>${bookingDetails.room.pricePerNight}</p>
                                    </div>

                                    <div className="col-6 col-lg-3 mt-4 mt-lg-0">
                                        <p>{bookingDetails.daysOfStay} Day(s)</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
