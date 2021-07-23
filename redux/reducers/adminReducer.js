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

// update reducer
export const updateReducer = (state = { message: "", error: null, loading: false }, action) => {
    switch (action.type) {
        case adminActionTypes.ADMIN_UPDATE_ROOM_REQUEST:
        case adminActionTypes.ADMIN_UPDATE_USER_REQUEST:
            return updateState(state, { loading: true });
        case adminActionTypes.ADMIN_UPDATE_ROOM_SUCCESS:
        case adminActionTypes.ADMIN_UPDATE_USER_SUCCESS:
            return updateState(state, { loading: false, message: action.payload.message });
        case adminActionTypes.ADMIN_UPDATE_ROOM_FAILURE:
        case adminActionTypes.ADMIN_UPDATE_USER_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case adminActionTypes.ADMIN_UPDATE_ROOM_RESET:
        case adminActionTypes.ADMIN_UPDATE_USER_RESET:
            return updateState(state, { message: "", error: null, loading: false });
        case adminActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};

// delete room reducer
export const deleteReducer = (state = { message: "", error: null, loading: false }, action) => {
    switch (action.type) {
        case adminActionTypes.ADMIN_DELETE_ROOM_REQUEST:
        case adminActionTypes.ADMIN_DELETE_BOOKING_REQUEST:
        case adminActionTypes.ADMIN_DELETE_USER_REQUEST:
            return updateState(state, { loading: true });
        case adminActionTypes.ADMIN_DELETE_ROOM_SUCCESS:
        case adminActionTypes.ADMIN_DELETE_BOOKING_SUCCESS:
        case adminActionTypes.ADMIN_DELETE_USER_SUCCESS:
            return updateState(state, { loading: false, message: action.payload.message });
        case adminActionTypes.ADMIN_DELETE_ROOM_FAILURE:
        case adminActionTypes.ADMIN_DELETE_BOOKING_FAILURE:
        case adminActionTypes.ADMIN_DELETE_USER_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case adminActionTypes.ADMIN_DELETE_ROOM_RESET:
        case adminActionTypes.ADMIN_DELETE_BOOKING_RESET:
        case adminActionTypes.ADMIN_DELETE_USER_RESET:
            return updateState(state, { message: "", error: null, loading: false });
        case adminActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};

// All bookings reducer
export const allBookingsReducer = (
    state = { bookings: [], error: null, loading: false },
    action
) => {
    switch (action.type) {
        case adminActionTypes.ADMIN_ALL_BOOKINGS_REQUEST:
            return updateState(state, { loading: true });
        case adminActionTypes.ADMIN_ALL_BOOKINGS_SUCCESS:
            return updateState(state, { loading: false, bookings: action.payload.bookings });
        case adminActionTypes.ADMIN_ALL_BOOKINGS_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case adminActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};

// All users reducer
export const allUsersReducer = (state = { users: [], error: null, loading: false }, action) => {
    switch (action.type) {
        case adminActionTypes.ADMIN_ALL_USERS_REQUEST:
            return updateState(state, { loading: true });
        case adminActionTypes.ADMIN_ALL_USERS_SUCCESS:
            return updateState(state, { loading: false, users: action.payload.users });
        case adminActionTypes.ADMIN_ALL_USERS_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case adminActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};

// user details reducer
export const userDetailsReducer = (state = { user: null, error: null, loading: false }, action) => {
    switch (action.type) {
        case adminActionTypes.ADMIN_USER_DETAILS_REQUEST:
            return updateState(state, { loading: true });
        case adminActionTypes.ADMIN_USER_DETAILS_SUCCESS:
            return updateState(state, { loading: false, user: action.payload.user });
        case adminActionTypes.ADMIN_USER_DETAILS_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case adminActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};

// room reviews reducer
export const allReviewsReducer = (state = { reviews: [], error: null, loading: false }, action) => {
    switch (action.type) {
        case adminActionTypes.ADMIN_ALL_REVIEWS_REQUEST:
            return updateState(state, { loading: true });
        case adminActionTypes.ADMIN_ALL_REVIEWS_SUCCESS:
            return updateState(state, { loading: false, reviews: action.payload.reviews });
        case adminActionTypes.ADMIN_ALL_REVIEWS_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case adminActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};
