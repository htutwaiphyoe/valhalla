import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

import { clearError } from "../../redux/actions/bookingActions";
const Bookings = (props) => {
    const dispatch = useDispatch();

    const { myBookings, error } = useSelector((state) => state.myBookings);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, error]);

    return (
        <div className="container container-fluid overflow-auto">
            <h1 className="my-5">My Bookings</h1>
            <table className="table table-striped w-100 overflow-auto">
                <thead style={{ color: "#fff", backgroundColor: "hsl(250, 69%, 61%)" }}>
                    <tr>
                        <th scope="col">Booking Id</th>
                        <th scope="col" className="d-none d-lg-block">
                            Amount
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myBookings &&
                        myBookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={{ fontSize: "12.5px" }}>{booking._id}</td>
                                <td className="d-none d-lg-block">{`$${booking.amountPaid}`}</td>
                                <td>
                                    <>
                                        <Link href={`/bookings/${booking._id}`}>
                                            <a className="btn btn-primary">
                                                <i className="fa fa-eye"></i>
                                            </a>
                                        </Link>

                                        <button className="btn btn-success ml-2">
                                            <i className="fa fa-download"></i>
                                        </button>
                                    </>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Bookings;
/* <td className="d-none d-lg-block">
                                    {new Date(booking.checkInDate).toLocaleString("en-US", {
                                        year: "numeric",
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </td>
                                <td className="d-none d-lg-block">
                                    {new Date(booking.checkOutDate).toLocaleString("en-US", {
                                        year: "numeric",
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </td> */
/* <th scope="col" className="d-none d-lg-block">
                            Check In
                        </th>
                        <th scope="col" className="d-none d-lg-block">
                            Check Out
                        </th> */

// const getBookingTableData = () => {
//     const data = {
//         columns: [
//             {
//                 label: "Booking ID",
//                 field: "id",
//                 sort: "asc",
//             },
//             {
//                 label: "Check In",
//                 field: "checkIn",
//                 sort: "asc",
//             },
//             {
//                 label: "Check Out",
//                 field: "checkOut",
//                 sort: "asc",
//             },
//             {
//                 label: "Amount Paid",
//                 field: "amount",
//                 sort: "asc",
//             },
//             {
//                 label: "Actions",
//                 field: "actions",
//                 sort: "asc",
//             },
//         ],
//         rows: [],
//     };

//     myBookings &&
//         myBookings.forEach((booking) => {
//             data.rows.push({
//                 id: booking._id,
//                 checkIn: new Date(booking.checkInDate).toLocaleString("en-US", {
//                     year: "numeric",
//                     day: "numeric",
//                     month: "long",
//                 }),

//                 checkOut: new Date(booking.checkOutDate).toLocaleString("en-US", {
//                     year: "numeric",
//                     day: "numeric",
//                     month: "long",
//                 }),
//                 amount: `$${booking.amountPaid}`,
//                 actions: (
//                     <>
//                         <Link href={`/bookings/${booking._id}`}>
//                             <a className="btn btn-primary">
//                                 <i className="fa fa-eye"></i>
//                             </a>
//                         </Link>

//                         <button className="btn btn-success mx-2">
//                             <i className="fa fa-download"></i>
//                         </button>
//                     </>
//                 ),
//             });
//         });

//     return data;
// };

/* <MDBDataTable data={getBookingTableData()} className="px-3" bordered striped hover /> */
