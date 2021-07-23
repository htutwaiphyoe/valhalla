import { combineReducers } from "redux";

import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import * as userReducer from "./userReducer";
import * as bookingReducer from "./bookingReducer";
import * as reviewReducer from "./reviewReducer";
import * as adminReducer from "./adminReducer";

const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    signup: userReducer.signupReducer,
    loggedInUser: userReducer.loggedInUserReducer,
    updateUser: userReducer.updateUserReducer,
    forgotPassword: userReducer.forgotPasswordReducer,
    resetPassword: userReducer.resetPasswordReducer,
    checkBooking: bookingReducer.checkBookingReducer,
    bookedDates: bookingReducer.bookedDatesReducer,
    myBookings: bookingReducer.myBookingsReducer,
    bookingDetails: bookingReducer.bookingDetailsReducer,
    hasBookings: bookingReducer.hasBookingsReducer,
    newReview: reviewReducer.newReviewReducer,
    allRoomsByAdmin: adminReducer.allRoomsReducer,
    newRoom: adminReducer.newRoomReducer,
    update: adminReducer.updateReducer,
    delete: adminReducer.deleteReducer,
    allBookings: adminReducer.allBookingsReducer,
    allUsers: adminReducer.allUsersReducer,
    userDetails: adminReducer.userDetailsReducer,
    allReviews: adminReducer.allReviewsReducer,
});

export default rootReducer;
