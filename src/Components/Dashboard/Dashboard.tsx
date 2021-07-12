import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature, faFileMedical } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { isListInStorage } from '../../Utils/utils'

import './Dashboard.scss'

const Dashboard = () => {
  /** State */
  const [ isPrevious, setIsPrevious ] = useState(false)

  /** component did mount */
  useEffect(() => {
    const doesListExist = isListInStorage()
    setIsPrevious(doesListExist)
  }, [])

  return (
    <div className="dashboard">
      <Link
        to="/editor"
        className="icon-link"
      >
        <button
          className="icon-button"
          disabled={!isPrevious}
        >
          <FontAwesomeIcon
            icon={faFileSignature}
            className="icon-button__icon"
          />
          <p className="icon-button__text">Edit saved file</p>
        </button>
      </Link>

      <p className="separator">Or</p>

      <Link
        to="/editor/new"
        className="icon-link"
      >
        <button
          className="icon-button"
        >
          <FontAwesomeIcon
            icon={faFileMedical}
            className="icon-button__icon"
            />
          <p className="icon-button__text">Create new file</p>
        </button>
      </Link>
    </div>
  )
}

export default Dashboard
