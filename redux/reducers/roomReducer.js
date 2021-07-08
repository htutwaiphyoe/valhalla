import * as roomActionTypes from "../actionTypes/roomActionTypes";
import { updateState } from "../../utils/helpers";

// All rooms reducer
export const allRoomsReducer = (state = { rooms: [], error: null }, action) => {
    switch (action.type) {
        case roomActionTypes.ALL_ROOMS_SUCCESS:
            return updateState(state, {
                results: action.payload.results,
                rooms: action.payload.data.data,
            });
        case roomActionTypes.ALL_ROOMS_FAIL:
            return updateState(state, {
                error: action.payload,
            });
        case roomActionTypes.CLEAR_ERRORS:
            return updateState(state, {
                error: null,
            });
        default:
            return state;
    }
};

// Room detail reducer
export const roomDetailsReducer = (state = { room: {}, error: null }, action) => {
    switch (action.type) {
        case roomActionTypes.ROOM_DETAILS_SUCCRSS: {
            return updateState(state, { room: action.payload });
        }
        case roomActionTypes.ROOM_DETAILS_FAIL: {
            return updateState(state, { error: action.payload });
        }
        case roomActionTypes.CLEAR_ERRORS: {
            return updateState(state, { errror: null })
        }
        default:
            return state;
    }
};
