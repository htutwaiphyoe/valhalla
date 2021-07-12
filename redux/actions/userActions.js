import * as userActionTypes from "../actionTypes/userActionTypes";
import valhallaAxios from "../../utils/valhallaAxios";

export const signup = (userData) => async (dispatch) => {
    try {
        dispatch({ type: userActionTypes.SIGNUP_REQUEST });
        const response = await valhallaAxios.post("/api/auth/signup", userData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        dispatch({
            type: userActionTypes.SIGNUP_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: userActionTypes.SIGNUP_FAIL,
            payload: err.response.data.message,
        });
    }
};

// clear error
export const clearError = () => async (dispatch) => {
    dispatch({ type: userActionTypes.CLEAR_ERROR });
};
