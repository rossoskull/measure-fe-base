import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route } from 'react-router-dom'

import Editor from './Components/Editor/Editor'
import Home from './Components/Home/Home'

import './Sass/_base.scss'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route
        exact
        path="/"
        component={Home}
      />

      <Route
        exact
        path="/editor"
        component={Editor}
      />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
