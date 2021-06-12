import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const bindMiddlewares = (middlewares) => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middlewares));
    }
    return applyMiddleware(...middlewares);
};

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    }
    return rootReducer(state, action);
};

const initStore = () => createStore(reducer, bindMiddlewares([thunk]));

export default createWrapper(initStore);
