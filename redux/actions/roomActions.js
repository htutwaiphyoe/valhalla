import * as roomActionTypes from "../actionTypes/roomActionTypes";
import valhallaAxios from "../../utils/valhallaAxios";

// All rooms
export const getRooms =
    (page = 1, location = "", guestCapacity, category) =>
    async (dispatch) => {
        const params = {
            page,
            location,
        };
        if (guestCapacity) params["guestCapacity"] = guestCapacity;

        if (category) params["category"] = category;

        try {
            const response = await valhallaAxios.get("/api/rooms", {
                params,
            });
            dispatch({
                type: roomActionTypes.ALL_ROOMS_SUCCESS,
                payload: response.data,
            });
        } catch (err) {
            dispatch({
                type: roomActionTypes.ALL_ROOMS_FAIL,
                payload: err.response.data.message,
            });
        }
    };

// Room details
export const getRoomDetails = (id) => async (dispatch) => {
    try {
        const response = await valhallaAxios.get(`/api/rooms/${id}`);
        dispatch({
            type: roomActionTypes.ROOM_DETAILS_SUCCRSS,
            payload: response.data.data.data,
        });
    } catch (err) {
        dispatch({
            type: roomActionTypes.ROOM_DETAILS_FAIL,
            payload: err.response.data.message,
        });
    }
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: roomActionTypes.CLEAR_ERRORS,
    });
};
