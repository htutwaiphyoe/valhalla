import * as reviewActionTypes from "../actionTypes/reviewActonTypes";
import valhallaAxios from "../../utils/valhallaAxios";

// check new review
export const createNewReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: reviewActionTypes.NEW_REVIEW_REQUEST,
        });

        const response = await valhallaAxios.post(`/api/reviews`, reviewData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        dispatch({
            type: reviewActionTypes.NEW_REVIEW_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: reviewActionTypes.NEW_REVIEW_FAILURE,
            error: err.response.data.message,
        });
    }
};

// clear error
export const clearError = () => {
    return {
        type: reviewActionTypes.CLEAR_ERROR,
    };
};

// reset review
export const resetReview = () => {
    return {
        type: reviewActionTypes.NEW_REVIEW_RESET,
    };
};
