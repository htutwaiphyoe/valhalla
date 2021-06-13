import { combineReducers } from "redux";

import { allRoomsReducer } from "./roomReducer";

const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
});

export default rootReducer;
