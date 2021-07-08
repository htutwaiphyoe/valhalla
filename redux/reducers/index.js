import { combineReducers } from "redux";

import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";

const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetals: roomDetailsReducer,
});

export default rootReducer;
