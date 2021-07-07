import React, { useState, useEffect } from 'react'

import { DataEntry } from '../../../Utils/utils'

interface DisplayListProps {
  list: Array<DataEntry>
}

const DisplayList = ({ list }: DisplayListProps) => {
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
      <table>
        <tr>
          <th>Sr. no.</th>
          <th>Height</th>
          <th>Width</th>
          <th>Length</th>
          <th>Volume</th>
        </tr>
        {list.map((l) => {
          return (
            <tr>
              <td>{l.sr}</td>
              <td>{l.height}</td>
              <td>{l.width}</td>
              <td>{l.length}</td>
              <td>{l.getVolume()}</td>
            </tr>
          )
        })}
      </table>
      <p>Total volume: {totalVolume}</p>
    </div>
  )
}

export default DisplayList