import * as userActionTypes from "../actionTypes/userActionTypes";
import valhallaAxios from "../../utils/valhallaAxios";

// signup action
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

// load user action
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: userActionTypes.LOAD_USER_REQUEST });

        const response = await valhallaAxios.get("/api/me");
        dispatch({
            type: userActionTypes.LOAD_USER_SUCCESS,
            payload: response.data.data.data,
        });
    } catch (err) {
        dispatch({
            type: userActionTypes.LOAD_USER_FAIL,
            payload: err.response.data.message,
        });
    }
};

// update user profile action
export const updateUserProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: userActionTypes.UPDATE_PROFILE_REQUEST });
        const response = await valhallaAxios.patch("/api/me/update", userData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        dispatch({
            type: userActionTypes.UPDATE_PROFILE_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: userActionTypes.UPDATE_PROFILE_FAIL,
            payload: err.response.data.message,
        });
    }
};
// clear error action
export const clearError = () => async (dispatch) => {
    dispatch({ type: userActionTypes.CLEAR_ERROR });
};

export const resetSignup = () => async (dispatch) => {
    dispatch({ type: userActionTypes.SIGNUP_RESET });
};
