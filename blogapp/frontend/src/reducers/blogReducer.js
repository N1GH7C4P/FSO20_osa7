import blogService from '../services/blogs'
import {setMessage} from './notificationReducer'

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'DELETE_BLOG':
            console.log('action.data: '+action.data)
            state = state.filter(blog => blog.id !== action.data)
            return state
        case 'UPDATE_BLOGS':
            state = action.data
            return state
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'UPDATE_BLOG':
            const blogToRemove = state.find(blog => blog.id === action.data.id)
            const index = state.indexOf(blogToRemove)
            state.splice(index,1,action.data)
            return state
        case 'ADD_COMMENT' :
            const blogToUpdate = state.find(blog => blog.id === action.data.blog.id)
            console.log('action.data.blog.id: '+action.data.blog.id)
            console.log(blogToUpdate.title)
            const i = state.indexOf(blogToUpdate)
            blogToUpdate.comments.concat(action.data)
            state.splice(i,1,blogToUpdate)
            return state
        default: return state
    }
}

export const addComment = (commentObject) => {
    return async dispatch => {
        blogService
        .createComment(commentObject)
        .then(returnedComment => {
            dispatch(
                {type: 'ADD_COMMENT',
                data: returnedComment})
            })       
    }
}

export const createBlog = (blogObject) => {
    return async dispatch => {
        blogService
        .create(blogObject)
        .then(returnedBlog => {
            dispatch(
                {type: 'NEW_BLOG',
                data: returnedBlog})
            })
        .catch(error => {
        console.log(error.response.data)
        setMessage(error.response.data)
        })
    }
}

export const initBlogs = () => {
    return async dispatch => {
        blogService
            .getAll()
            .then(initialBlogs => {
                const sortedBlogs = initialBlogs.sort((a,b) => b.likes - a.likes)
        dispatch({
            type: 'UPDATE_BLOGS',
            data: sortedBlogs})
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        blogService
            .remove(id)
            .catch(error => {
                setMessage(error)
            })
        dispatch({
            type: 'DELETE_BLOG',
            data: id
        })
    }
}

export const updateBlog = (blogObject) => {
    return async dispatch => {
        blogService
            .update(blogObject.id,blogObject)
            .catch(error => {
            setMessage(error)
        })
        dispatch({
            type: 'UPDATE_BLOG',
            data: blogObject
        })
    }
}

export default blogReducer