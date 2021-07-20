import * as bookingActionTypes from "../actionTypes/bookingActionTypes";
import { updateState } from "../../utils/helpers";
import booking from "../../models/booking";

// check booking reducer
export const checkBookingReducer = (
    state = { loading: false, error: null, isAvailable: null },
    action
) => {
    switch (action.type) {
        case bookingActionTypes.CHECK_BOOKING_REQUEST:
            return updateState(state, { loading: true });
        case bookingActionTypes.CHECK_BOOKING_SUCCESS:
            return updateState(state, { loading: false, isAvailable: action.payload.isAvailable });
        case bookingActionTypes.CHECK_BOOKING_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case bookingActionTypes.CHECK_BOOKING_RESET:
            return updateState(state, { loading: false, error: null, isAvailable: null });
        case bookingActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};

// booked dates reducer
export const bookedDatesReducer = (state = { bookedDates: [], error: null }, action) => {
    switch (action.type) {
        case bookingActionTypes.BOOKED_DATES_SUCCESS:
            return updateState(state, { bookedDates: action.payload.bookedDates });
        case bookingActionTypes.BOOKED_DATES_FAILURE:
            return updateState(state, { error: action.payload });
        case bookingActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};

// my booking reducer
export const myBookingsReducer = (state = { myBookings: [], error: null }, action) => {
    switch (action.type) {
        case bookingActionTypes.MY_BOOKINGS_SUCCESS:
            return updateState(state, { myBookings: action.payload.bookings });
        case bookingActionTypes.MY_BOOKINGS_FAILURE:
            return updateState(state, { error: action.payload });
        case bookingActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};

// booking details reducer
export const bookingDetailsReducer = (state = { bookingDetails: null, error: null }, action) => {
    switch (action.type) {
        case bookingActionTypes.BOOKING_DETAILS_SUCCESS:
            return updateState(state, { bookingDetails: action.payload.booking });
        case bookingActionTypes.BOOKING_DETAILS_FAILURE:
            return updateState(state, { error: action.payload });
        case bookingActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};
