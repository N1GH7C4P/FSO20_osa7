import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const LoginForm = ({
  handleSubmit,
}) => {

  return (    
    <form onSubmit={handleSubmit}>
      <div>
            username
        <input
          id='username'
          type="text"
          name="Username"
        />
      </div>
      <div>
            password
        <input
          id='password'
          type="password"
          name="Password"
        />
      </div>
      <Button id='login-Button' variant="primary" size="sm" type="submit">login</Button> 
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm