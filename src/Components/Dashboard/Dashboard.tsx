import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature, faFileMedical } from '@fortawesome/free-solid-svg-icons'
import { Link, Redirect } from 'react-router-dom'

import { addListToLocalStorage, DataEntry, setCustomerData } from '../../Utils/utils'

import './Dashboard.scss'

const Dashboard = () => {
  /** State */
  const [redirect, setRedirect] = useState('')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    const csv = e.target.files ? e.target.files[0] : null
    if (csv) {
      const fr = new FileReader()

      fr.onload = () => {
        const result = fr.result
        if (typeof result === 'string') {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [docTitles, docDetails, empty, titles, ...data] = result.split('\n')
          if (docDetails && data) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [emptyDetail, invoice, customer, product] = docDetails.split(',')
            const validData = data.join('|')

            setCustomerData(customer, invoice, product)

            // Set data in localStorage
            const dataListArray: Array<DataEntry> = []
            if (validData!.length > 0) {
              const csvList = validData!.split('|')

              csvList.forEach((csv) => {
                const data = csv!.split(',') || ['0', '0', '0', '0']
                const entry = new DataEntry(parseFloat(data[0]), parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]))

                dataListArray.push(entry)
              })    
            }

            addListToLocalStorage(dataListArray)

            setRedirect('/editor')
          }
        }
      }

      fr.readAsText(csv)
    }
  }

  if (redirect.length > 0) {
    return (
      <Redirect
        to={redirect}
      />
    )
  }

  return (
    <div className="dashboard">
      <label htmlFor="edit-saved-file" className="icon-button">
        <FontAwesomeIcon
          icon={faFileSignature}
          className="icon-button__icon"
        />
        <p className="icon-button__text">Edit saved file</p>

        <input
          type="file"
          id="edit-saved-file"
          className="dashboard__file-input"
          name="edit-saved-file"
          accept="text/csv"
          onChange={handleFileUpload}
        />
      </label>


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
