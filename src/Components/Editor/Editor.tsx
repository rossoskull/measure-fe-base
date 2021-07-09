import React, { useState } from 'react'

import DisplayList from './DisplayList/DisplayList'
import Input from './Input/Input'
import { DataEntry } from '../../Utils/utils'

import './Editor.scss'

const Editor = () => {
  /** State */
  const [dataList, setDataList] = useState<DataEntry[]>([])
  const [currentInput, setCurrentInput] = useState({
    length: '0',
    height: '0',
    width: '0'
  })

  const resetCurrentInput = () => {
    setCurrentInput({
      length: '0',
      height: '0',
      width: '0'
    })
  }

  const updateCurrentInput = (value: string, field: number) => {
    console.log(value)
    if (field === 0) {
      setCurrentInput({
        ...currentInput,
        height: value
      })
    } else if (field === 1) {
      setCurrentInput({
        ...currentInput,
        width: value
      })
    } else {
      setCurrentInput({
        ...currentInput,
        length: value
      })
    }
  }

  const addDataToList = (sr: number) => {
    const { length, height, width } = currentInput
    console.log(length, height, width)
    if (length !== '0' && height !== '0' && width !== '0') {
      const newList = dataList.slice()
      newList.push(new DataEntry(sr, parseFloat(height), parseFloat(width), parseFloat(length)))
      setDataList(newList)
    }
  }

  return (
    <div className="editor">
      {currentInput.height} {currentInput.width} {currentInput.length}
      <DisplayList list={dataList} />
      <Input
        sr={dataList.length + 1}
        fieldValues={currentInput}
        addNewEntry={addDataToList}
        updateCurrentInput={updateCurrentInput}
        resetInputs={resetCurrentInput}
      />
    </div>
  )
}

export default Editor