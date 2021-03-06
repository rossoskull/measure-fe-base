import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route } from 'react-router-dom'

import Home from './Components/Home/Home'
import Editor from './Components/Editor/Editor'
import Dashboard from './Components/Dashboard/Dashboard'

import './Sass/_base.scss'
import PrintTable from './Components/PrintTable/PrintTable'

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
        path="/dashboard"
        component={Dashboard}
      />

      <Route
        exact
        path="/editor"
        component={Editor}
      />

      <Route
        exact
        path="/editor/new"
        render={(props) => <Editor {...props} isNew />}
      />

      <Route
        exact
        path="/print"
        component={PrintTable}
      />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
