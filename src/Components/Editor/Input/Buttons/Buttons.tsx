import React from 'react'

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
      <Button label="<" onClick={props.previousField} />
      <Button label="1" onClick={() => props.handleInputClick('1')} />
      <Button label="2" onClick={() => props.handleInputClick('2')} />
      <Button label="3" onClick={() => props.handleInputClick('3')} />
      <Button label="NL" onClick={() => props.handleInputClick('NL')} />
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
  return (
    <div className="buttons__button" onClick={() => onClick ? onClick() : null}>
      {label}
    </div>
  )
}

export default Buttons