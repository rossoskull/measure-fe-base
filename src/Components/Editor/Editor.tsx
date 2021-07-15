import React, { useState, useEffect } from 'react'

import DisplayList from './DisplayList/DisplayList'
import Input from './Input/Input'
import { addListToLocalStorage, DataEntry, getListFromStorage, getSr, isListInStorage, setCustomerData, setNewSr, setNewSrWithValue } from '../../Utils/utils'

import './Editor.scss'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPen, faPrint } from '@fortawesome/free-solid-svg-icons'

interface EditorProps {
  isNew?: Boolean
}
const Editor = ({ isNew }: EditorProps) => {
  const history = useHistory()

  /** State */
  const [dataList, setDataList] = useState<DataEntry[]>([])
  const [currentInput, setCurrentInput] = useState({
    length: '',
    height: '',
    width: ''
  })
  const [docSr, setDocSr] = useState('')

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

    const sr = getSr()
    if (sr && !isNew) {
      setDocSr(sr)
    } else if (sr && isNew) {
      const intSr = parseInt(sr)
      const newSr = intSr + 1
      setDocSr(newSr.toString())
    } else {
      const newSr = setNewSr()
      setDocSr(newSr)
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
    setNewSrWithValue(docSr)
  }

  const updateDocSr = () => {
    const newSr = prompt('Enter new sr. no.') || ''
    const intSr = parseInt(newSr)

    if (!Number.isNaN(intSr) && intSr > 0) {
      setNewSrWithValue(newSr)
      setDocSr(newSr)
    }
  }

  const handlePrint = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const customerName = prompt('Enter customer name')
    const invoiceNum = prompt('Enter invoice number')
    const productName = prompt('Enter product name')

    if (customerName && invoiceNum && productName) {
      setCustomerData(customerName, invoiceNum, productName)

      history.push('/print')
    }
  }

  /** Edit values of list items */
  const editValues = (index: number, property: string, value: number) => {
    const newList = dataList.slice()

    if (property === 'height') {
      newList[index].height = value
    } else if (property === 'width') {
      newList[index].width = value
    } else {
      newList[index].length = value
    }
    setDataList(newList)
    updateDataInStorage(newList)
  }

  const editIndex = (oldIndex: number, newIndex: number) => {
    const newList = dataList.slice()
    if (oldIndex !== newIndex && newIndex >= 0 && newIndex < dataList.length - 1) {
      newList.splice(newIndex, 0, ...newList.splice(oldIndex, 1))
      setDataList(newList)
      updateDataInStorage(newList)
    }
  }

  return (
    <div className="editor">
      <div className="editor__header">
        <p className="editor__header__title">Measure</p>
        <p className="editor__header__doc-sr" onClick={updateDocSr}>
          Doc. sr. {docSr} <FontAwesomeIcon icon={faPen} />
        </p>
        <div className="editor__header__links">
          <Link to="/dashboard" className="editor__header__links__link">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Link>

          <p className="editor__header__links__link" onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} /> Print
          </p>
        </div>
      </div>
      <DisplayList
        list={dataList}
        removeFromList={removeFromList}
        editValues={editValues}
        editIndex={editIndex}
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