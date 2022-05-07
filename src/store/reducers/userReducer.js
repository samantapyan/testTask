export const GET_USER = "GET_USER"
export const SET_USER = "GET_USER"
export const getUser = (data) => ({
    type: GET_USER,
    data
})

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
            console.log("SUPER ACTION",action);

            return {...state, user}
            break;
        case GET_USER:
            console.log("SUPER ACTION",action);
            return {...state, user}
        default:
            return state


    }
}