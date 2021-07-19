import * as bookingActionTypes from "../actionTypes/bookingActionTypes";
import { updateState } from "../../utils/helpers";

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
