import { combineReducers } from "redux";

import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import { signupReducer, loggedInUserReducer, updateUserReducer } from "./userReducer";

const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    signup: signupReducer,
    loggedInUser: loggedInUserReducer,
    updateUser: updateUserReducer,
});

export default rootReducer;
