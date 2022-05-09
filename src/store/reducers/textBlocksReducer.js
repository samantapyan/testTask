export const ADD_TEXT_BLOCK = "ADD_TEXT_BLOCK"
export const ADD_TEXT_BLOCK_SUCCESSED = "ADD_TEXT_BLOCK_SUCCESSED"
export const GET_TEXT_BLOCKS_SUCCESSED = "GET_TEXT_BLOCKS_SUCCESSED"
export const GET_TEXT_BLOCKS = "GET_TEXT_BLOCKS"
export const UPDATE_TEXT_BLOCK = "UPDATE_TEXT_BLOCK"
export const UPDATE_TEXT_BLOCK_SUCCESSED = "UPDATE_TEXT_BLOCK_SUCCESSED"
export const REMOVE_TEXT_BLOCK = 'REMOVE_TEXT_BLOCK'
export const CHANGE_TEXT_BLOCKS = "CHANGE_TEXT_BLOCKS"


export const addTextBlock = (textBlockData) => ({
    type: ADD_TEXT_BLOCK,
    textBlockData
})


export const getTextBlocksSuccessed = (textBlocks) => ({
    type: GET_TEXT_BLOCKS_SUCCESSED,
    textBlocks
})

export const updateTextBlock = (textBlockData) => ({
    type: UPDATE_TEXT_BLOCK,
    textBlockData
})

export const getTextBlocks = (textBlock) => ({
    type: GET_TEXT_BLOCKS,
    textBlock
})

export const changeTextBlocks = (textBlocks) => ({
    type: CHANGE_TEXT_BLOCKS,
    textBlocks
})

export const removeTextBlock = (id) => ({
    type: REMOVE_TEXT_BLOCK,
    id
})

export const addTextBlockSuccessed = (textBlockData) => ({
    type: ADD_TEXT_BLOCK_SUCCESSED,
    textBlockData
})

export const updateTextBlocksSuccessed = (textBlockData) => ({
    type: UPDATE_TEXT_BLOCK_SUCCESSED,
    textBlockData
})

const initialState = {
    textBlocks: []
}

export const textBlocksReducer = (state = initialState, action) => {
    let newData = []
    switch (action.type) {
        case UPDATE_TEXT_BLOCK_SUCCESSED:
           newData = state.textBlocks.map(t => {
               if (t.id === action.textBlockData.id) {
                   return {...action.textBlockData}
               } else {
                   return {...t}
               }
           })
            return {...state, textBlocks: newData}
        case REMOVE_TEXT_BLOCK:
            newData = state.textBlocks.filter(t => t.id !== action.id)
            return {...state, textBlocks: newData}
            break;
        case GET_TEXT_BLOCKS_SUCCESSED:
            return {...state, textBlocks: [...action.textBlocks]}
            break;

        case ADD_TEXT_BLOCK_SUCCESSED:
            return {...state, textBlocks: [...state.textBlocks, action.textBlockData]}
            break;

        default:
            return state


    }
}