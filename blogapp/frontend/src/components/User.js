import React  from 'react'
import {useParams} from "react-router-dom"
import Table from 'react-bootstrap/Table'

const User = ({ users }) => {

  const id = useParams().id
  const user = users.find(user => user.id === id)
  
  if(!user) {
    return null
  }

  return (

    <div  className = 'user'>
      <Table striped>
        <thead>
          <th><h1 id='userHeader'>{user.name}</h1></th>
        </thead>
        <tbody>
          <th><h2>Blogs added:</h2></th>
          {user.blogs.map(blog => 
            <tr key={blog.id}> 
              <th>{blog.title}</th> 
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default User