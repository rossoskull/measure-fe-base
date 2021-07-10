import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faCaretLeft, faCaretRight, faEraser } from '@fortawesome/free-solid-svg-icons'

import './Button.scss'

interface ButtonsInterface {
  nextField: Function
  previousField: Function
  handleInputClick: Function
}
const Buttons = (props: ButtonsInterface) => {
  return (
    <div className="buttons">
      <Button label="7" onClick={() => props.handleInputClick('7')} />
      <Button label="8" onClick={() => props.handleInputClick('8')} />
      <Button label="9" onClick={() => props.handleInputClick('9')} />
      <Button label="CLS" onClick={() => props.handleInputClick('CLS')} />
      <Button label="4" onClick={() => props.handleInputClick('4')} />
      <Button label="5" onClick={() => props.handleInputClick('5')} />
      <Button label="6" onClick={() => props.handleInputClick('6')} />
      <Button label="DEL" onClick={() => props.handleInputClick('DEL')} />
      <Button label="1" onClick={() => props.handleInputClick('1')} />
      <Button label="2" onClick={() => props.handleInputClick('2')} />
      <Button label="3" onClick={() => props.handleInputClick('3')} />
      <Button label="<" onClick={props.previousField} />
      <Button label="." onClick={() => props.handleInputClick('.')} />
      <Button label="0" onClick={() => props.handleInputClick('0')} />
      <Button label="1.5" onClick={() => props.handleInputClick('1.5')} />
      <Button label=">" onClick={props.nextField} />
    </div>
  )
}

/** Button component */
interface ButtonInterface {
  label: string
  onClick?: Function
}

const Button = ({ label, onClick }: ButtonInterface) => {
  var content: any 
  if (label === 'CLS') {
    content = <FontAwesomeIcon icon={faEraser} />
  } else if (label === 'DEL') {
    content = <FontAwesomeIcon icon={faBackspace} />
  } else if (label === '<') {
    content = <FontAwesomeIcon icon={faCaretLeft} />
  } else if (label === '>') {
    content = <FontAwesomeIcon icon={faCaretRight} />
  } else {
    content = label
  }

  return (
    <div className="buttons__button" onClick={() => onClick ? onClick() : null}>
      {content}
    </div>
  )
}

export default Buttons