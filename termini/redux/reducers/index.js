import { combineReducers } from "redux";
import themeReducer from "./theme";
import rutaReducer from "./ruta"
import rutaEditReducer from "./rutaEdit";
import rutaSudjiOrgReducer from "./rutaSudjiOrg";
const allReducers = combineReducers({

    theme:themeReducer,
    ruta:rutaReducer,
    rutaSudjiOrg:rutaSudjiOrgReducer,
    
    rutaEdit:rutaEditReducer
})

export default allReducers