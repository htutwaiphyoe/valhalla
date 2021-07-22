import * as adminActionTypes from "../actionTypes/adminActionTypes";
import { updateState } from "../../utils/helpers";

// All rooms reducer
export const allRoomsReducer = (state = { rooms: [], error: null, loading: false }, action) => {
    switch (action.type) {
        case adminActionTypes.ADMIN_ALL_ROOMS_REQUEST:
            return updateState(state, { loading: true });
        case adminActionTypes.ADMIN_ALL_ROOMS_SUCCESS:
            return updateState(state, { loading: false, rooms: action.payload.rooms });
        case adminActionTypes.ADMIN_ALL_ROOMS_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case adminActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};

// new room reducer
export const newRoomReducer = (state = { message: "", error: null, loading: false }, action) => {
    switch (action.type) {
        case adminActionTypes.ADMIN_NEW_ROOM_REQUEST:
            return updateState(state, { loading: true });
        case adminActionTypes.ADMIN_NEW_ROOM_SUCCESS:
            return updateState(state, { loading: false, message: action.payload.message });
        case adminActionTypes.ADMIN_NEW_ROOM_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case adminActionTypes.ADMIN_NEW_ROOM_RESET:
            return updateState(state, { message: "", error: null, loading: false });
        case adminActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};

// update room reducer
export const updateRoomReducer = (state = { message: "", error: null, loading: false }, action) => {
    switch (action.type) {
        case adminActionTypes.ADMIN_UPDATE_ROOM_REQUEST:
            return updateState(state, { loading: true });
        case adminActionTypes.ADMIN_UPDATE_ROOM_SUCCESS:
            return updateState(state, { loading: false, message: action.payload.message });
        case adminActionTypes.ADMIN_UPDATE_ROOM_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case adminActionTypes.ADMIN_UPDATE_ROOM_RESET:
            return updateState(state, { message: "", error: null, loading: false });
        case adminActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};
