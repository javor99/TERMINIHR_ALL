
const themeReducer = (state="dark",action)=> {
    switch(action.type) {
        case "DARK":
            return "dark"
        case "LIGHT":
            return "light"
        default:
            return state
            
    }
}

export default themeReducer