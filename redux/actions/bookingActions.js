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

// clear errors
export const clearError = () => {
    return {
        type: bookingActionTypes.CLEAR_ERROR,
    };
};
