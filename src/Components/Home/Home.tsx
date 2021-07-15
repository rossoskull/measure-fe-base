import React, { useEffect, useState } from 'react'

import { Redirect } from 'react-router-dom'

import { authCreds } from '../../constants'

import './Home.scss'

const Home = () => {
  /** States */
  const [fieldState, setFieldState] = useState({
    id: '',
    password: ''
  })
  const [redirect, setRedirect] = useState('')

  /** Component did mount */
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('auth')

    if (isLoggedIn === 'true') {
      setRedirect('/dashboard')
    }
  }, [])

  /** Handle form field value change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setFieldState({
      ...fieldState,
      [key]: e.target.value
    })
  }

  /** Handle form submit */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (fieldState.id === authCreds.id && fieldState.password === authCreds.pass) {
      localStorage.setItem('auth', 'true')
      setRedirect('/dashboard')
    }
  }

  /** Redirect if logged in */
  if (redirect.length > 0) {
    return <Redirect to={redirect} />
  }

  /** Show login form */
  return (
    <div className="home">
      <h1>Log In to Measure</h1>
      <form action="#" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Login ID"
          onChange={(e) => handleChange(e, 'id')}
          value={fieldState.id}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e, 'password')}
          value={fieldState.password}
        />
        <input type="submit" value="Log In" />
      </form>
    </div>
  )
}

export default Home