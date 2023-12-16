export const  setUser = (data) => {
    return {
        type : "SET_USER",
        payload : data
    }
};

export const  changeAVAL = (data) => {
    return {
        type : "SET_AVAL",
        payload : data
    }
};

export const fixData = (data) => {
    return {
        type : "SET_FIX",
        payload : data
    }
};

export const fixRow = (data) => {
    return {
        type : "SET_FIX_ROW",
        payload : data
    }
};

export const clubRow = (data) => {
    return {
        type : "SET_CLUB_ROW",
        payload : data
    }
};

export const playerRow = (data) => {
    return {
        type : "SET_PLAYER_ROW",
        payload : data
    }
};

export const mvData = (data) => {
    return {
        type : "SET_MV",
        payload : data
    }
};

export const setComment = (data) => {
    return {
        type : "SET_COMMENT",
        payload : data
    }
};
export const setRating = (data) => {
    return {
        type : "SET_RATING",
        payload : data
    }
};