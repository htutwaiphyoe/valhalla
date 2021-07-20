import * as bookingActionTypes from "../actionTypes/bookingActionTypes";
import valhallaAxios from "../../utils/valhallaAxios";

// check booking actions
export const checkBooking = (room, checkInDate, checkOutDate) => async (dispatch) => {
    try {
        dispatch({
            type: bookingActionTypes.CHECK_BOOKING_REQUEST,
        });

        const response = await valhallaAxios.get(
            `/api/bookings/check?room=${room}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
        );

        dispatch({
            type: bookingActionTypes.CHECK_BOOKING_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: bookingActionTypes.CHECK_BOOKING_FAILURE,
            error: err.response.data.message,
        });
    }
};

// get booked dates action
export const getBookedDates = (room) => async (dispatch) => {
    try {
        const response = await valhallaAxios.get(`/api/bookings/dates?room=${room}`);

        dispatch({
            type: bookingActionTypes.BOOKED_DATES_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: bookingActionTypes.BOOKED_DATES_FAILURE,
            error: err.response.data.message,
        });
    }
};

// get my bookings action
export const getMyBookings = (cookie) => async (dispatch) => {
    try {
        const response = await valhallaAxios.get(`/api/bookings/me`, {
            headers: {
                cookie,
            },
        });

        dispatch({
            type: bookingActionTypes.MY_BOOKINGS_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: bookingActionTypes.MY_BOOKINGS_FAILURE,
            error: err.response.data.message,
        });
    }
};

// get booking details
export const getBookingDetails = (cookie, bookingId) => async (dispatch) => {
    try {
        const response = await valhallaAxios.get(`/api/bookings/${bookingId}`, {
            headers: {
                cookie,
            },
        });

        dispatch({
            type: bookingActionTypes.BOOKING_DETAILS_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: bookingActionTypes.BOOKING_DETAILS_FAILURE,
            error: err.response.data.message,
        });
    }
};

// clear errors
export const clearError = () => {
    return {
        type: bookingActionTypes.CLEAR_ERROR,
    };
};
