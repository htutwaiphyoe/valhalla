import * as reviewActionTypes from "../actionTypes/reviewActonTypes";
import { updateState } from "../../utils/helpers";

// All rooms reducer
export const newReviewReducer = (state = { message: "", error: null, loading: false }, action) => {
    switch (action.type) {
        case reviewActionTypes.NEW_REVIEW_REQUEST:
            return updateState(state, { loading: true });
        case reviewActionTypes.NEW_REVIEW_SUCCESS:
            return updateState(state, { loading: false, message: action.payload.message });
        case reviewActionTypes.NEW_REVIEW_FAILURE:
            return updateState(state, { loading: false, error: action.payload });
        case reviewActionTypes.NEW_REVIEW_RESET:
            return updateState(state, { loading: false, error: null, message: "" });
        case reviewActionTypes.CLEAR_ERROR:
            return updateState(state, { error: null });
        default:
            return state;
    }
};
