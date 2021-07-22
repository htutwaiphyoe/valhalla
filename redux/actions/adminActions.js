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

// clear error
export const clearError = () => {
    return {
        type: adminActionTypes.CLEAR_ERROR,
    };
};
