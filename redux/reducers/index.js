import { combineReducers } from "redux";

import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";

const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
});

export default rootReducer;
