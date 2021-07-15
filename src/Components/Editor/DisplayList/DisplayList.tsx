import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DataEntry } from '../../../Utils/utils'

import './DisplayList.scss'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface DisplayListProps {
  list: Array<DataEntry>
  removeFromList: Function
  editValues: Function
  editIndex: Function
}

const DisplayList = ({ list, removeFromList, editValues, editIndex }: DisplayListProps) => {
  /** State */
  const [totalVolume, setTotalVolume] = useState('')

  /** Hook */
  useEffect(() => {
    // Scroll to bottom
    scrollToBottom()

    // Get total volume
    let volume = 0
    list.forEach((item) => {
      const itemVolume = parseFloat(item.getVolume())
      volume += itemVolume
    })
    setTotalVolume(volume.toFixed(3))
  }, [list])

  /** Scroll to bottom */
  const scrollToBottom = () => {
    const elements = document.getElementById('display-table')?.children
    if (elements) {
      const element = elements[elements.length - 1]
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  /** Edit functions */
  const editHeight = (index: number, value: number) => {
    const newValue = prompt('Enter new value for height') || ''
    if (parseInt(newValue)) {
      editValues(index, 'height', parseInt(newValue))
    }
  }

  const editWidth = (index: number, value: number) => {
    const newValue = prompt('Enter new value for width') || ''
    if (parseInt(newValue)) {
      editValues(index, 'width', newValue)
    }
  }

  const editLength = (index: number, value: number) => {
    const newValue = prompt('Enter new value for length') || ''
    if (parseInt(newValue)) {
      editValues(index, 'length', newValue)
    }
  }

  /** Edit index of item */
  const swapItem = (oldIndex: number) => {
    const newIndex = prompt(`Enter new location of item at ${oldIndex + 1}`) || ''
    if (parseInt(newIndex)) {
      editIndex(oldIndex, parseInt(newIndex) - 1)
    }
  }

  return (
    <div className="display-list">
      <div className="table-container">
        {list.length === 0 && (
          <div className="empty-table">
            No data to show...
          </div>
        )}

        <table id="display-table">
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
                <td onClick={() => swapItem(lIdx)}>{l.sr}</td>
                <td onClick={() => editHeight(lIdx, l.height)}>{l.height}</td>
                <td onClick={() => editWidth(lIdx, l.width)}>{l.width}</td>
                <td onClick={() => editLength(lIdx, l.length)}>{l.length}</td>
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