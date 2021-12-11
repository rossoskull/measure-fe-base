import React from 'react'
import { useRef, useState} from 'react'

import Buttons from './Buttons/Buttons'

import './Input.scss'

interface InputInterface {
  sr?: number
  addNewEntry: Function
  fieldValues: {
    height: string
    width: string
    length: string
  }
  updateCurrentInput: Function
  resetInputs: Function
}

const Input = ({sr, addNewEntry, fieldValues, updateCurrentInput, resetInputs} : InputInterface) => {
  /** Field refs */
  const heightRef = useRef<HTMLInputElement>(null)
  const widthRef = useRef<HTMLInputElement>(null)
  const lengthRef = useRef<HTMLInputElement>(null)

  /** State */
  const [currentField, setCurrentField] = useState(0)
  const [resetCurrentField, setResetCurrentField] = useState(true)

  /** Access fields */
  const refArray = [lengthRef, widthRef, heightRef]

  const validateCurrentField = () => {
    const { height, width, length } = fieldValues
    if (currentField === 0 && length.length === 0) {
      return false
    } else if (currentField === 1 && width.length === 0) {
      return false
    } else if (currentField === 2 && height.length === 0) {
      return false
    }

    return true
  }

  const nextField = () => {
    if (!validateCurrentField()) return
    let newField = 0
    let prevField = 2
    if (currentField < 2) {
      newField = currentField + 1
      prevField = currentField
      setCurrentField(currentField + 1)
    } else {
      /** Enter new line */
      addNewEntry(sr)
      setCurrentField(0)
    }

    const node = refArray[newField].current
    const prevNode = refArray[prevField].current

    if (node) {
      node['classList']['add']('focus')
    }
    
    if (prevNode) {
      prevNode['classList']['remove']('focus')
    }

    setResetCurrentField(true)
  }

  const previousField = () => {
    let newField = 2
    let prevField = 0

    if (currentField > 0) {
      newField = currentField - 1
      prevField = currentField
      setCurrentField(currentField - 1)

      const node = refArray[newField].current
      const prevNode = refArray[prevField].current
  
      if (node) {
        node['classList']['add']('focus')
      }
      
      if (prevNode) {
        prevNode['classList']['remove']('focus')
      }
      setResetCurrentField(true)
    }
  }

  const handleInputClick = (value: string) => {
    let currentFieldValue = ''
    if (!resetCurrentField) {
      if (currentField === 0) {
        const stringValue = fieldValues.length.toString()
        currentFieldValue = stringValue === '0' ? '' : stringValue
      } else if (currentField === 1) {
        const stringValue = fieldValues.width.toString()
        currentFieldValue = stringValue === '0' ? '' : stringValue
      } else {
        const stringValue = fieldValues.height.toString()
        currentFieldValue = stringValue === '0' ? '' : stringValue
      }
    }

    setResetCurrentField(false)
    
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(value)) {
      if (value === '.' && currentFieldValue.includes('.')) return
      currentFieldValue = `${currentFieldValue}${value}`
      updateCurrentInput(currentFieldValue, currentField)
    } else if (value === '1.5') {
      currentFieldValue = '1.5'
      updateCurrentInput(currentFieldValue, currentField)
    } else if (value === 'CLS') {
      resetInputs()
    } else if (value === 'DEL' && currentFieldValue.length > 0) {
      currentFieldValue = currentFieldValue.slice(0, -1)
      updateCurrentInput(currentFieldValue, currentField)
    }
  }

  return (
    <div className="ed-input">
      <div className="ed-input__fields-container">
        <div className="ed-input__fields header">
          <p className="ed-input__fields__field srno">Sr. no.</p>
          <p className="ed-input__fields__field srno">Length</p>
          <p className="ed-input__fields__field srno">Width</p>
          <p className="ed-input__fields__field srno">Thickness</p>
        </div>
        <div className="ed-input__fields">
          <p className="ed-input__fields__field srno">{sr}</p>
          <input
            readOnly
            type="text"
            placeholder="length"
            ref={lengthRef}
            className="ed-input__fields__field focus"
            value={parseInt(fieldValues.length) === 0 ? '' : fieldValues.length}
          />
          <input
            readOnly
            type="text"
            placeholder="width"
            ref={widthRef}
            className="ed-input__fields__field"
            value={parseInt(fieldValues.width) === 0 ? '' : fieldValues.width}
            />
          <input
            readOnly
            type="text"
            placeholder="thickness"
            ref={heightRef}
            className="ed-input__fields__field"
            value={parseInt(fieldValues.height) === 0 ? '' : fieldValues.height}
          />
        </div>
      </div>

      <Buttons
        nextField={nextField}
        previousField={previousField}
        handleInputClick={handleInputClick}
      />
    </div>
  )
}

export default Input