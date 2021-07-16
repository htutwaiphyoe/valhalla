import { combineReducers } from "redux";

import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import * as userReducer from "./userReducer";

const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    signup: userReducer.signupReducer,
    loggedInUser: userReducer.loggedInUserReducer,
    updateUser: userReducer.updateUserReducer,
    forgotPassword: userReducer.forgotPasswordReducer,
});

export default rootReducer;
