import { createStore, combineReducers , applyMiddleware} from 'redux'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    login: loginReducer,  
    blogs: blogReducer,  
    notification: notificationReducer, 
    users: userReducer
})

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store