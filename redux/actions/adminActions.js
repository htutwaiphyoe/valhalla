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
        console.log(err.response);
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
        console.log(err.response);
        dispatch({
            type: adminActionTypes.ADMIN_UPDATE_ROOM_FAILURE,
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
export const resetNewRoom = () => {
    return {
        type: adminActionTypes.ADMIN_UPDATE_ROOM_RESET,
    };
};
