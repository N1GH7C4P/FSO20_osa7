import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Blog = ({ blog, removeFunction, likeBlog, handleComment }) => {

  if(!blog) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('blog.comments: '+blog.comments)

  return (
    <div style={blogStyle} className = 'blog'>
      
      <Container>
        <Row>
          <Col><h1 id='blogHeader'>{blog.title} by {blog.author}</h1>
            <a  href={blog.url}>{blog.url} </a>
            <div className='likes'>Likes: <span >{blog.likes}</span></div>
          </Col>
          <Col>
            <Button variant='success' size="lg" name = {blog.title} value={blog.id} id='likeButton' onClick={likeBlog}>Like</Button>
            <Button variant='danger' size="lg" name = {blog.title} value={blog.id} onClick={removeFunction}> Delete</Button>
          </Col>
        </Row>
      </Container>   
      <Table striped>
        <thead>
          <tr>
            <th><b>Comments</b></th>
          </tr>
        </thead>
          <tbody>
          {blog.comments.map(c =>
            <tr key={c.id}>
              <th>{c.content}</th>
            </tr>
            )}
          </tbody>
        </Table>

      <form onSubmit={handleComment}>
      <input
        name='content'
      />
      <Button variant='primary' size="sm" type="submit">Comment</Button>
    </form>
    </div>
  )
}

export default Blog