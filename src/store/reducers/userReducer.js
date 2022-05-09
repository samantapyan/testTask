export const GET_USER = "GET_USER"
export const SET_USER = "GET_USER"

export const setUser = (user) => ({
    type: SET_USER,
    user
})


const initialState = {
    user: null
}

export const userReducer = (state = initialState, action) => {
    const {user} = action
    switch (action.type) {
        case SET_USER:
            return {...state, user}
            break;
        case GET_USER:
            return {...state, user}
        default:
            return state


    }
}