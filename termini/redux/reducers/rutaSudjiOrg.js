
const rutaSudjiOrgReducer = (state=0,action)=> {
    switch(action.type) {
        case "NEWSudjiOrg":
            return state+1
        
        default:
            return state
            
    }
}

export default rutaSudjiOrgReducer