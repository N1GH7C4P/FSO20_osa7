const checkAuthentication = (element) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if(element.user.username === user.username) {
        return true
      }
      else{
        return false
      }
    }
  }

export {checkAuthentication}