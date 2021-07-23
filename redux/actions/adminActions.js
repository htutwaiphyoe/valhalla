import * as adminActionTypes from "../actionTypes/adminActionTypes";
import valhallaAxios from "../../utils/valhallaAxios";

// get all rooms by admin
export const getAllRoomsByAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_ALL_ROOMS_REQUEST });
        const response = await valhallaAxios.get(`/api/admin/rooms`);

        dispatch({
            type: adminActionTypes.ADMIN_ALL_ROOMS_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_ALL_ROOMS_FAILURE,
            error: err.response.data.message,
        });
    }
};

// create new rooms by admin
export const createNewRoomByAdmin = (roomData) => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_NEW_ROOM_REQUEST });
        const response = await valhallaAxios.post(`/api/admin/rooms`, roomData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        dispatch({
            type: adminActionTypes.ADMIN_NEW_ROOM_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_NEW_ROOM_FAILURE,
            error: err.response.data.message,
        });
    }
};

// update room by admin
export const updateRoomByAdmin = (roomId, roomData) => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_UPDATE_ROOM_REQUEST });

        const response = await valhallaAxios.patch(`/api/admin/rooms/${roomId}`, roomData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        dispatch({
            type: adminActionTypes.ADMIN_UPDATE_ROOM_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_UPDATE_ROOM_FAILURE,
            error: err.response.data.message,
        });
    }
};

// delete room by admin
export const deleteRoomByAdmin = (roomId) => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_DELETE_ROOM_REQUEST });

        const response = await valhallaAxios.delete(`/api/admin/rooms/${roomId}`);

        dispatch({
            type: adminActionTypes.ADMIN_DELETE_ROOM_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_DELETE_ROOM_FAILURE,
            error: err.response.data.message,
        });
    }
};

// get all bookings by admin
export const getAllBookingsByAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_ALL_BOOKINGS_REQUEST });
        const response = await valhallaAxios.get(`/api/admin/bookings`);

        dispatch({
            type: adminActionTypes.ADMIN_ALL_BOOKINGS_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_ALL_BOOKINGS_FAILURE,
            error: err.response.data.message,
        });
    }
};

// delete booking by admin
export const deleteBookingByAdmin = (bookingId) => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_DELETE_BOOKING_REQUEST });

        const response = await valhallaAxios.delete(`/api/admin/bookings/${bookingId}`);

        dispatch({
            type: adminActionTypes.ADMIN_DELETE_BOOKING_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_DELETE_BOOKING_FAILURE,
            error: err.response.data.message,
        });
    }
};

// get all users by admin
export const getAllUsersByAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_ALL_USERS_REQUEST });
        const response = await valhallaAxios.get(`/api/admin/users`);

        dispatch({
            type: adminActionTypes.ADMIN_ALL_USERS_SUCCESS,
            payload: response.data.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_ALL_USERS_FAILURE,
            error: err.response.data.message,
        });
    }
};

// get user details by admin
export const getUserDetailsByAdmin = (cookie, id) => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_USER_DETAILS_REQUEST });
        const response = await valhallaAxios.get(`/api/admin/users/${id}`, {
            headers: {
                cookie,
            },
        });

        dispatch({
            type: adminActionTypes.ADMIN_USER_DETAILS_SUCCESS,
            payload: response.data.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_USER_DETAILS_FAILURE,
            error: err.response.data.message,
        });
    }
};

// update user by admin
export const updateUserByAdmin = (userId, userData) => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_UPDATE_USER_REQUEST });

        const response = await valhallaAxios.patch(`/api/admin/users/${userId}`, userData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        dispatch({
            type: adminActionTypes.ADMIN_UPDATE_USER_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_UPDATE_USER_FAILURE,
            error: err.response.data.message,
        });
    }
};

// delete user by admin
export const deleteUserByAdmin = (userId) => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_DELETE_USER_REQUEST });

        const response = await valhallaAxios.delete(`/api/admin/users/${userId}`);

        dispatch({
            type: adminActionTypes.ADMIN_DELETE_USER_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_DELETE_USER_FAILURE,
            error: err.response.data.message,
        });
    }
};

// get room reviews by admin
export const getAllReviewsByAdmin = (id) => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_ALL_REVIEWS_REQUEST });
        const response = await valhallaAxios.get(`/api/admin/reviews`);

        dispatch({
            type: adminActionTypes.ADMIN_ALL_REVIEWS_SUCCESS,
            payload: response.data.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_ALL_REVIEWS_FAILURE,
            error: err.response.data.message,
        });
    }
};

// delete review by admin
export const deleteReviewByAdmin = (roomId, reviewId) => async (dispatch) => {
    try {
        dispatch({ type: adminActionTypes.ADMIN_DELETE_REVIEW_REQUEST });

        const response = await valhallaAxios.delete(
            `/api/admin/reviews/${reviewId}?roomId=${roomId}`
        );

        dispatch({
            type: adminActionTypes.ADMIN_DELETE_REVIEW_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: adminActionTypes.ADMIN_DELETE_REVIEW_FAILURE,
            error: err.response.data.message,
        });
    }
};

// clear error
export const clearError = () => {
    return {
        type: adminActionTypes.CLEAR_ERROR,
    };
};

// new room reset
export const resetNewRoom = () => {
    return {
        type: adminActionTypes.ADMIN_NEW_ROOM_RESET,
    };
};

// reset update room
export const resetUpdateRoom = () => {
    return {
        type: adminActionTypes.ADMIN_UPDATE_ROOM_RESET,
    };
};

// reset delete room
export const resetDeleteRoom = () => {
    return {
        type: adminActionTypes.ADMIN_DELETE_ROOM_RESET,
    };
};

// reset delete booking
export const resetDeleteBooking = () => {
    return {
        type: adminActionTypes.ADMIN_DELETE_BOOKING_RESET,
    };
};

// reset update user
export const resetUpdateUser = () => {
    return {
        type: adminActionTypes.ADMIN_UPDATE_USER_RESET,
    };
};

// reset delete user
export const resetDeleteUser = () => {
    return {
        type: adminActionTypes.ADMIN_DELETE_USER_RESET,
    };
};

// reset delete review
export const resetDeleteReview = () => {
    return {
        type: adminActionTypes.ADMIN_DELETE_REVIEW_RESET,
    };
};
