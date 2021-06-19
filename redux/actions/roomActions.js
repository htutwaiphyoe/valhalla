import * as roomActionTypes from "../actionTypes/roomActionTypes";
import valhallaAxios from "../../utils/valhallaAxios";

export const getRooms = () => async (dispatch) => {
    try {
        const response = await valhallaAxios.get("/api/rooms");
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

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: roomActionTypes.CLEAR_ERRORS,
    });
};
