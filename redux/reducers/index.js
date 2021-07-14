import { combineReducers } from "redux";

import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import { signupReducer, loggedInUserReducer } from "./userReducer";

const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    signup: signupReducer,
    loggedInUser: loggedInUserReducer,
});

export default rootReducer;
