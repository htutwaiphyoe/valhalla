import * as roomActionTypes from "../actionTypes/roomActionTypes";
import valhallaAxios from "../../utils/valhallaAxios";

export const getRooms = () => async (dispatch) => {
    try {
        const response = await valhallaAxios.get("/api/rooms");
        console.log(response);
        dispatch({
            type: roomActionTypes.ALL_ROOMS_SUCCESS,
            payload: response,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: roomActionTypes.ALL_ROOMS_FAIL,
            payload: err,
        });
    }
};

export const clearErrors = () => {
    return {
        type: roomActionTypes.CLEAR_ERRORS,
    };
};
