import React from 'react'
import Button from 'react-bootstrap/Button'

const BlogForm = ({ addFunction }) => {

  return (
    <form onSubmit={addFunction}>
      <div>Blog title:  </div>
      <input id='titleInput'
        name='title'
      />
      <div>Author: </div>
      <input id='authorInput'
        name='author'
      />
      <div>Blog url:  </div>
      <input id='urlInput'
        name='url'
      />
      <div>likes: </div>
      <input id='likesInput'
        name='likes'
      />
      <div>
        <Button id='submitButton' variant="primary" size="sm" type="submit">Submit</Button> 
      </div>
    </form>
  )
}

export default BlogForm