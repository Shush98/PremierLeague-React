const initialState = {
    A_val : 0,
    fix_data : [{}],
    fix_row : {},
    club_row : {},
    player_row : {player_id:62},
    mv_data : [{}],
    set_user : {},
    rating_data : {rating:5,Pstyle:'Click on a Player'}
}

export default(state = initialState,action) =>{
    switch(action.type) {
        case "SET_USER":
        return {
            ...state,
            set_user : action.payload
        }
        case "SET_AVAL":
        return {
            ...state,
            A_val : action.payload
        }
        case "SET_FIX":
        return {
            ...state,
            fix_data : action.payload
        }
        case "SET_FIX_ROW":
        return {
            ...state,
            fix_row : action.payload
        }
        case "SET_CLUB_ROW":
        return {
            ...state,
            club_row : action.payload
        }
        case "SET_PLAYER_ROW":
        return {
            ...state,
            player_row : action.payload
        }
        case "SET_MV":
        return {
            ...state,
            mv_data : action.payload
        }
        case "SET_COMMENT":
        return {
            ...state,
            comment_data : action.payload
        }
        case "SET_RATING":
        return {
            ...state,
            rating_data : action.payload
        }
        default:
            return state
    }
}