
const rutaEditReducer = (state=0,action)=> {
    switch(action.type) {
        case "NEWEdit":
            return state+1
        
        default:
            return state
            
    }
}

export default rutaEditReducer