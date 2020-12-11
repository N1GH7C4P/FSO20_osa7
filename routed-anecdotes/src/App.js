import React, { useState } from 'react'
import  { useField } from './hooks'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory 
} from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding} to="/createNew">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const Notification = ({notification}) => {
  return(
    <h2>{notification}</h2>
  )
}

const Anecdote = ({anecdotes}) => {

  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === id)

  return (
  <div>
    <h1>{anecdote.content}</h1>
    <h2>by {anecdote.author} at {anecdote.info}</h2>
    <p>has {anecdote.votes} votes</p>
  </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const content = useField('text')
  var {reset, ...contentlessReset} = content
  const author = useField('text')
  var {reset, ...authorlessReset} = author
  const info = useField('text')
  var {reset, ...infolessReset} = info
  const history = useHistory()

  const resetForm = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info
    })
    history.push("/")
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentlessReset} />
        </div>
        <div>
          author
          <input {...authorlessReset} />
        </div>
        <div>
          url for more info
          <input {...infolessReset} />
        </div>
        <button>create</button>
      </form>
      <button onClick={resetForm}>reset</button>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notification, setNotification] = useState('')

  const addNew = (obj) => {

    const anecdote = {
      content: obj.content.value,
      author: obj.author.value,
      info: obj.info.value,
      votes: 0,
      id: (Math.random() * 10000).toFixed(0)
    }

    setAnecdotes(anecdotes.concat(anecdote))
    setNotification('"'+anecdote.content+'"'+' was added to the database.')
    setTimeout(() => {
      setNotification('')
    }, 10000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    paddingRight: 5
  }

  return (
      <div class="container">
        <h1>Software anecdotes</h1>
        <Router>
        <Menu/>
          <Switch>
            <Route path="/createNew">
              <CreateNew addNew={addNew} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/anecdotes/:id">
              <Anecdote anecdotes={anecdotes} />      
            </Route>
            <Route path="/anecdotes">
              <AnecdoteList anecdotes={anecdotes} />
            </Route>
            <Route path="/">
              <Notification notification={notification}/>
              <AnecdoteList anecdotes={anecdotes} />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </div>
  )
}

export default App;