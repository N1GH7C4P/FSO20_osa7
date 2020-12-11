import userService from '../services/users'

const userReducer = (state = [], action) => {
    switch(action.type) {
        case 'RESET' : {
            const newState = []
            return state = newState
        }
        case 'UPDATE_USERS': {
          console.log('updating users')
          console.log(action.data)
          return state = action.data
        }
        default : return state
    }
}

export const initUsers = () => {
  return async dispatch => {
    userService
      .getAll()
      .then(initialUsers => {
        const sortedUsers = initialUsers.sort((a,b) => b.username - a.username)
        dispatch({
          type: 'UPDATE_USERS',
          data: sortedUsers
      })
    })
  }
}

export default userReducer