import { combineReducers } from "redux";

import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import * as userReducer from "./userReducer";
import * as bookingReducer from "./bookingReducer";

const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    signup: userReducer.signupReducer,
    loggedInUser: userReducer.loggedInUserReducer,
    updateUser: userReducer.updateUserReducer,
    forgotPassword: userReducer.forgotPasswordReducer,
    resetPassword: userReducer.resetPasswordReducer,
    checkBooking: bookingReducer.checkBookingReducer,
});

export default rootReducer;
