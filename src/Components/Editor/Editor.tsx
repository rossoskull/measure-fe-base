import React, { useState, useEffect } from 'react'

import DisplayList from './DisplayList/DisplayList'
import Input from './Input/Input'
import { addListToLocalStorage, DataEntry, getListFromStorage, isListInStorage } from '../../Utils/utils'

import './Editor.scss'

interface EditorProps {
  isNew?: Boolean
}
const Editor = ({ isNew }: EditorProps) => {
  /** State */
  const [dataList, setDataList] = useState<DataEntry[]>([])
  const [currentInput, setCurrentInput] = useState({
    length: '',
    height: '',
    width: ''
  })

  const resetCurrentInput = () => {
    setCurrentInput({
      length: '',
      height: '',
      width: ''
    })
  }

  /** Component did mount */
  useEffect(() => {
    const isPreviousData = isListInStorage()
    if (isPreviousData && !isNew) {
      let rawDataList = getListFromStorage()
      setDataList(rawDataList)
    }
  }, [isNew])

  const updateCurrentInput = (value: string, field: number) => {
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
    if (length !== '0' && height !== '0' && width !== '0') {
      const newList = dataList.slice()
      newList.push(new DataEntry(sr, parseFloat(height), parseFloat(width), parseFloat(length)))
      setDataList(newList)
      updateDataInStorage(newList)
    }
  }

  const removeFromList = (idx: number) => {
    const list = dataList.slice()

    list.splice(idx, 1)

    list.forEach((item, index) => {
      item.setSr(index + 1)
    })

    setDataList(list)
    updateDataInStorage(list)
  }

  const updateDataInStorage = (list: Array<DataEntry>) => {
    addListToLocalStorage(list)
  }

  return (
    <div className="editor">
      <p className="editor__header">Measure</p>
      <DisplayList
        list={dataList}
        removeFromList={removeFromList}
      />
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