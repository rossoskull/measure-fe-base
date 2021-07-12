import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature, faFileMedical } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router'

import { isListInStorage } from '../../Utils/utils'

import './Dashboard.scss'

const Dashboard = () => {
  /** State */
  const [ isPrevious, setIsPrevious ] = useState(false)
  const [ redirect, setRedirect ] = useState('')

  /** component did mount */
  useEffect(() => {
    const doesListExist = isListInStorage()
    setIsPrevious(doesListExist)
  }, [])

  /** Handle edit old file */
  const editOldFile = () => {
    setRedirect('/editor')
  }

  /** Handle create new file */
  const createNewFile = () => {
    setRedirect('/editor/new')
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="dashboard">
      <button
        className="icon-button"
        disabled={!isPrevious}
        onClick={editOldFile}
      >
        <FontAwesomeIcon
          icon={faFileSignature}
          className="icon-button__icon"
        />
        <p className="icon-button__text">Edit saved file</p>
      </button>

      <p className="separator">Or</p>

      <button
        className="icon-button"
        onClick={createNewFile}
      >
        <FontAwesomeIcon
          icon={faFileMedical}
          className="icon-button__icon"
        />
        <p className="icon-button__text">Create new file</p>
      </button>
    </div>
  )
}

export default Dashboard
