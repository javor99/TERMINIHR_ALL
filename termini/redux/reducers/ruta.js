
const rutaReducer = (state=0,action)=> {
    switch(action.type) {
        case "NEW":
            return state+1
        
        default:
            return state
            
    }
}

export default rutaReducer