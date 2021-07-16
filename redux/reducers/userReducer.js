import * as userActionTypes from "../actionTypes/userActionTypes";
import { updateState } from "../../utils/helpers";

// signup reducer
export const signupReducer = (state = { loading: false, success: null, error: null }, action) => {
    switch (action.type) {
        case userActionTypes.SIGNUP_REQUEST:
            return updateState(state, { loading: true });
        case userActionTypes.SIGNUP_SUCCESS:
            return updateState(state, { loading: false, success: action.payload.message });
        case userActionTypes.SIGNUP_FAIL:
            return updateState(state, { loading: false, error: action.payload });
        case userActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null, loading: false });
        case userActionTypes.SIGNUP_RESET:
            return updateState(state, { loading: false, success: null, error: null });
        default:
            return state;
    }
};

// load user reducer
export const loggedInUserReducer = (
    state = { loading: false, user: null, error: null, isAuthenticated: false },
    action
) => {
    switch (action.type) {
        case userActionTypes.LOAD_USER_REQUEST:
            return updateState(state, { loading: true, isAuthenticated: false });
        case userActionTypes.LOAD_USER_SUCCESS:
            return updateState(state, {
                loading: false,
                user: action.payload,
                isAuthenticated: true,
            });
        case userActionTypes.LOAD_USER_FAIL:
            return updateState(state, {
                loading: false,
                error: action.payload,
                isAuthenticated: false,
            });

        case userActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null, loading: false });
        default:
            return state;
    }
};

// update user profile reducer
export const updateUserReducer = (
    state = { loading: false, error: null, message: "", user: null },
    action
) => {
    switch (action.type) {
        case userActionTypes.UPDATE_PROFILE_REQUEST:
            return updateState(state, { loading: true });
        case userActionTypes.UPDATE_PROFILE_SUCCESS:
            return updateState(state, {
                loading: false,
                user: action.payload.user,
                message: action.payload.message,
            });
        case userActionTypes.UPDATE_PROFILE_FAIL: {
            return updateState(state, { loading: false, error: action.payload });
        }
        case userActionTypes.CLEAR_ERROR: {
            return updateState(state, { error: null, loading: false });
        }
        case userActionTypes.UPDATE_PROFILE_RESET: {
            return updateState(state, { loading: false, error: null, message: "", user: null });
        }
        default:
            return state;
    }
};

// forgot password reducer
export const forgotPasswordReducer = (
    state = { loading: false, message: "", error: null },
    action
) => {
    switch (action.type) {
        case userActionTypes.FORGOT_PASSWORD_REQUEST:
            return updateState(state, { loading: true });
        case userActionTypes.FORGOT_PASSWORD_SUCCESS:
            return updateState(state, { loading: false, message: action.payload });
        case userActionTypes.FORGOT_PASSWORD_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case userActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};
