import React, { useEffect, useState } from 'react'

import DisplayList from './DisplayList/DisplayList'
import { DataEntry } from '../../Utils/utils'

const Editor = () => {
  /** State */
  const [dataList, setDataList] = useState([
    new DataEntry(1, 1, 1, 1),
    new DataEntry(2, 2, 2, 2),
    new DataEntry(3, 3, 3, 3),
    new DataEntry(4, 4, 4, 4),
    new DataEntry(5, 5, 5, 5),
  ])
  const [currentInput, setCurrentInput] = useState({
    sr: null,
    length: null,
    breadth: null,
    width: null,
    volume: null
  })

  return (
    <div className="editor">
      <DisplayList list={dataList} />
    </div>
  )
}

export default Editor