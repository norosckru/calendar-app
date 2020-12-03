import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";

const { combineReducers } = require("redux");
const { uiReducer } = require("./uiReducer");


export const rootReducer = combineReducers({

    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer

})