import loginService from '../services/login'
import {setMessage} from './notificationReducer'
import blogService from '../services/blogs'

const initialState = 
    {
        username: null,
        password: null,
        name: null,
        blogs: []
    }

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_ACTIVE_USER' : {
          state = action.data
          return state
        }
        default : return state
    }
}

export const reloadLoggedUser = () => {
    return async dispatch => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        console.log('user: '+user)
        blogService.setToken(user.token)

        return dispatch({
          type:'SET_ACTIVE_USER',
          data: user
        })
      }
    }
  }
  
  export const logout = () => {
    return async dispatch => {
      window.localStorage.removeItem('loggedBlogappUser')
      return dispatch ({
        type:'SET_ACTIVE_USER',
        data: {
          username: null,
          password: null,
          name: null
        }
      })
    }
  }

  export const login = (username,password) => {
      return async dispatch => {
          try {
            console.log('username: '+username)
            console.log('password: '+password)
            const user = await loginService.login({
            username, password,
            })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        
            blogService.setToken(user.token)
            return dispatch({
              type:'SET_ACTIVE_USER',
              data: user
            })
          } catch (exception) {
            dispatch(setMessage('wrong credentials'))
            setTimeout(() => {
              dispatch(setMessage(null))
            }, 5000)
          }
      }
  }

export default loginReducer