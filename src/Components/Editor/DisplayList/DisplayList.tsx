import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DataEntry } from '../../../Utils/utils'

import './DisplayList.scss'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface DisplayListProps {
  list: Array<DataEntry>
  removeFromList: Function
}

const DisplayList = ({ list, removeFromList }: DisplayListProps) => {
  /** State */
  const [totalVolume, setTotalVolume] = useState('')

  /** Hook */
  useEffect(() => {
    let volume = 0
    list.forEach((item) => {
      const itemVolume = parseFloat(item.getVolume())
      volume += itemVolume
    })
    setTotalVolume(volume.toFixed(3))
  }, [list])

  return (
    <div className="display-list">
      <div className="table-container">
        {list.length === 0 && (
          <div className="empty-table">
            No data to show...
          </div>
        )}

        <table>
          <tr className="table-header">
            <th>Sr. no.</th>
            <th>Height</th>
            <th>Width</th>
            <th>Length</th>
            <th>Volume</th>
            <th></th>
          </tr>
          {list.map((l, lIdx) => {
            return (
              <tr className="table-data-row" key="lIdx">
                <td>{l.sr}</td>
                <td>{l.height}</td>
                <td>{l.width}</td>
                <td>{l.length}</td>
                <td>{l.getVolume()}</td>
                <td className="action-td">
                  <FontAwesomeIcon onClick={() => removeFromList(lIdx)} icon={faTrash} />
                </td>
              </tr>
            )
          })}
        </table>
      </div>

      <div className="display-list__details">
        <p><span>Total items:</span> {list.length}</p>
        <p><span>Total Quantity:</span> {totalVolume}</p>
      </div>
    </div>
  )
}

export default DisplayList