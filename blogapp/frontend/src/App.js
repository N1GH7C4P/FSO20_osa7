import React, { useRef, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { SuccessNotification } from './components/Notification'
import LoginForm from './components/LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import {createBlog, updateBlog, initBlogs, deleteBlog, addComment } from './reducers/blogReducer'
import {setMessageForSeconds} from './reducers/notificationReducer'
import {initUsers} from './reducers/userReducer'
import {login, logout, reloadLoggedUser} from './reducers/loginReducer'
import User from './components/User'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import {
  useRouteMatch,
  Switch, Route, Link
} from "react-router-dom"

const App = () => {

  const match = useRouteMatch('/blogs/:id')  

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUsers())
    dispatch(reloadLoggedUser())
    dispatch(initBlogs())
  },  [dispatch])

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.notification)
  const users = useSelector(state => state.users)
  const activeUser = useSelector(state => state.login)
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in: '+event.target.username.value+ ' : '+event.target.password.value)
    dispatch(login(
      event.target.username.value,
      event.target.password.value
    ))
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('Logging out.')
    dispatch(logout())
  }

  const Header = () => (
    <form onSubmit={handleLogout}>
      {activeUser.username === null ? null :
      <Table>
        <thead>
          <tr>
          <th><Link style={padding} to="/">home</Link></th>
          <th><Link style={padding} to="/blogs">blogs</Link></th>
          <th><Link style={padding} to="/users">users</Link></th>
          <th> {activeUser.username} logged in </th>
          <th><Button type="submit" variant="primary" size="sm"> logout </Button></th>
          </tr>
        </thead>
      </Table>}
    </form>
  )

  const handleComment = (event) => {
    
    event.preventDefault()

    const commentObject = {
      content: event.target.content.value,
      blog: blog
    }
    dispatch(addComment(commentObject))
    dispatch(setMessageForSeconds(`Kommentti lisätty.`,3))

    event.target.content.value = ''

  }
  
  const UserList = () => {
    return (
      <div>
        <h1>Users</h1>
        <Table striped>
        <thead>
          <tr>
            <th>User name</th>
            <th>Blogs</th>
          </tr>
        </thead>
          <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <th><Link to={`/users/${user.id}`}>{user.username} </Link></th>
              <th>Blogs posted: {user.blogs.length}</th>
            </tr>
            )}
          </tbody>
        </Table>
        </div>
    )
  }
  

  const BlogList = () => {
    return (
      <div>
        <Table striped>
        <thead>
          <tr>
            <th>Blog Name</th>
            <th>Author</th>
          </tr>
        </thead>
          <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <th><Link to={`/blogs/${blog.id}`}>{blog.title} </Link></th>
              <th>{blog.author}</th>
            </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if(window.confirm(`Poistetaanko ${event.target.name}?`)){
      dispatch(deleteBlog(event.target.value))
      dispatch(setMessageForSeconds(`${event.target.name} poistettiin tietokannasta.`,3))
    }
  }

  const likeBlog = (event) => {
    
    event.preventDefault()

    const oldBlog = blogs.find(blog => blog.title === event.target.name)

    const blogObject = {
      title: oldBlog.title,
      author: oldBlog.author,
      url: oldBlog.url,
      likes: oldBlog.likes+1,
      user: oldBlog.user,
      id: oldBlog.id,
      comments: oldBlog.comments
    }

    dispatch(updateBlog(blogObject))
    dispatch(setMessageForSeconds(`Blogista "${blogObject.title}" tykätty <3`,3))
  }

  const addBlog = (event) => {

    blogFormRef.current.toggleVisibility()
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: event.target.likes.value,
      comments: []
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    event.target.likes.value = ''

    if(blogs.find(blog => blog.title === blogObject.title)){
      const oldBlog = blogs.find(blog => blog.title === blogObject.title)
      if(window.confirm(`${blogObject.title} on jo luettelossa. Haluatko korvata blogin?`)){
        const updatedBlogObject = {
          title: blogObject.title,
          author: blogObject.author,
          url: blogObject.url,
          likes: blogObject.likes,
          id: oldBlog.id,
          comments: oldBlog.comments
        }
        dispatch(updateBlog(updatedBlogObject))
        dispatch(setMessageForSeconds(`Blogin "${updatedBlogObject.title}" tiedot päivitettiin.`,3))
      }
    }
    else{
      dispatch(createBlog(blogObject))
      dispatch(setMessageForSeconds(`${blogObject.title} lisättiin blogilistalle.`,3))
    }
  }

  const padding = {
    padding: 5
  }

  return (      
      <div className="container">
        <SuccessNotification message={message} />
        <Header/>
      <Switch>
        <Route path="/users/:id"> 
          <User users={users}/>
        </Route>
        <Route path="/users"> 
          <UserList/>
        </Route>
        <Route path="/blogs/:id"> 
          <Blog blog={blog} removeFunction={removeBlog} likeBlog={likeBlog} handleComment={handleComment}/>
        </Route>
        <Route path="/blogs">
          <h1>Blogs</h1> 
          <BlogList/>
        </Route>
        <Route path="/">
          <Table>
            <thead>
              <tr>
                <th><h1>Blog list app</h1></th>
              </tr>
              {activeUser.username === null ?
              <tr>
                <Togglable buttonLabel="Login" ref={loginFormRef}>
                <th> <LoginForm handleSubmit={handleLogin}/> </th>
                </Togglable>
              </tr> :
              <tr>
                <th>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm addFunction = {addBlog}/>
                </Togglable>
                </th>
              </tr>
              }
            </thead>
          </Table>

          <BlogList/>
        </Route>
      </Switch>
      </div>
  )
}

export default App