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
        default:
            return state;
    }
};
