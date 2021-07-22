import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";
import easyinvoice from "easyinvoice";

import { formatDate } from "../../utils/helpers";

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

    const downloadInvoice = async (booking) => {
        const data = {
            documentTitle: "Hotel Valhalla Booking Invoice", //Defaults to INVOICE
            locale: "en-US", //Defaults to en-US, used for number formatting (see docs)
            currency: "USD", //See documentation 'Locales and Currency' for more info
            taxNotation: "vat", //or gst
            marginTop: 25,
            marginRight: 25,
            marginLeft: 25,
            marginBottom: 25,
            logo: "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
            background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf
            sender: {
                company: "Hotel Valhalla",
                address: "Mandalay",
                zip: "1234 AB",
                city: "Mandalay",
                country: "Myanmar",
            },
            client: {
                company: booking.user.name,
                address: booking.user.email,
                zip: "",
                city: `Check In: ${formatDate(booking.checkInDate)}`,
                country: `Check Out: ${formatDate(booking.checkOutDate)}`,
            },
            invoiceNumber: booking._id,
            invoiceDate: formatDate(Date.now()),
            products: [
                {
                    quantity: booking.daysOfStay,
                    description: booking.room.name,
                    tax: 0,
                    price: booking.room.pricePerNight,
                },
            ],
            bottomNotice: "Thank you very much for your booking on Hotel Valhalla.",
        };

        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`booking-invoice.pdf`, result.pdf);
    };
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
                        <td className="d-none d-md-table-cell">{`Check In`}</td>
                        <td className="d-none d-md-table-cell">{`Check Out`}</td>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myBookings &&
                        myBookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={{ fontSize: "12.5px" }}>{booking._id}</td>
                                <td className="d-none d-lg-block">{`$${booking.amountPaid}`}</td>
                                <td className="d-none d-md-table-cell">{`${formatDate(
                                    booking.checkInDate
                                )}`}</td>
                                <td className="d-none d-md-table-cell">{`${formatDate(
                                    booking.checkOutDate
                                )}`}</td>
                                <td>
                                    <>
                                        <Link href={`/bookings/${booking._id}`}>
                                            <a className="btn btn-primary">
                                                <i className="fa fa-eye"></i>
                                            </a>
                                        </Link>

                                        <button
                                            className="btn btn-success ml-2"
                                            onClick={() => downloadInvoice(booking)}
                                        >
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
