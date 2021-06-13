import { ALL_ROOMS_SUCCESS, ALL_ROOMS_FAIL, CLEAR_ERRORS } from "../actionTypes/roomActionTypes";

// All rooms reducer
export const allRoomsReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ALL_ROOMS_SUCCESS:
            return {
                results: action.payload.results,
                rooms: action.payload.rooms,
            };
        case ALL_ROOMS_FAIL:
            return {
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                error: null,
            };
        default:
            return state;
    }
};
