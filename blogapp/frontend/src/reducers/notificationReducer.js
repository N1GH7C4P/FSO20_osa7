const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_MESSAGE': {
            return(state = action.data)
        }
        default: return state
    }
}

export const setMessage = (message) => {
    clearTimeout()
    return({
        type: 'SET_MESSAGE',
        data: message
    })
}

export const setMessageForSeconds = (message, seconds) => {
    return async dispatch => {
        clearTimeout()    
        dispatch({
            type: 'SET_MESSAGE',
            data: message
        })
        setTimeout(() => {
            dispatch(setMessage(null))
        }, seconds*1000);
    }
}

export default notificationReducer