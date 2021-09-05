import React from 'react'

import Moment from 'moment'

import { DataEntry } from '../../../Utils/utils'

import './Table.scss'

interface TableInterface {
  list: Array<DataEntry>
  volume: string
  sr: string
  customerData: {
    customer: string
    invoice: string
    product: string
  }
}
const Table = ({ list, volume, sr, customerData }: TableInterface) => {

  const rows = list.map((l) => {
    return (
      <div className="p-table__trow">
        <div className="p-table__trow__cell w1 cell right">{l.sr}</div>
        <div className="p-table__trow__cell w2 cell">{customerData.product}</div>
        <div className="p-table__trow__cell w3 cell right">1</div>
        <div className="p-table__trow__cell w3 cell right">{l.length}</div>
        <div className="p-table__trow__cell w3 cell right">{l.width}</div>
        <div className="p-table__trow__cell w3 cell right">{l.height}</div>
        <div className="p-table__trow__cell w4 cell right">{l.getVolume()}</div>
      </div>
    )
  })

  return (
    <div className="p-table">
      <div className="p-table__title-box">
        <p className="p-table__title-box__title">Sahajanand Saw Mill</p>
        <p className="p-table__title-box__subtitle">Measurement Sheet</p>
      </div>

      <div className="p-table__desc-box">
        <div className="p-table__desc-box__left">
          <div className="p-table__desc-box__left__cell cell">
            <span className="p-table__desc-box__left__cell__label"></span>
            {/* {sr} */}
          </div>
          <div className="p-table__desc-box__left__cell cell">
            <span className="p-table__desc-box__left__cell__label">Invoice No.</span>
            {customerData.invoice}
          </div>
          <div className="p-table__desc-box__left__cell cell">
            <span className="p-table__desc-box__left__cell__label">Customer Name</span>
            {customerData.customer}
          </div>
        </div>
        <div className="p-table__desc-box__right">
          <div className="p-table__desc-box__right__date cell">
            <span className="p-table__desc-box__right__date__label">Date</span>
            {Moment().format('DD/MM/YYYY')}
          </div>
          <div className="p-table__desc-box__right__calculation-type cell">
            <span className="p-table__desc-box__right__calculation-type__label">
              Calculation Type
            </span>
            Cubic Feet
          </div>
        </div>
      </div>

      <div className="p-table__head">
        <div className="p-table__head__cell w1 cell right">Sr. No.</div>
        <div className="p-table__head__cell w2 cell">Product Name</div>
        <div className="p-table__head__cell w3 cell right">Pieces</div>
        <div className="p-table__head__cell w3 cell right">Length</div>
        <div className="p-table__head__cell w3 cell right">Width</div>
        <div className="p-table__head__cell w3 cell right">Thickness</div>
        <div className="p-table__head__cell w4 cell right">Quantity</div>
      </div>

      {rows}

      <div className="p-table__footrow">
        <div className="p-table__footrow__cell cell right">Total Pieces</div>
        <div className="p-table__footrow__cell cell right">{list.length}</div>
        <div className="p-table__footrow__cell cell right">Total Cubic Feet</div>
        <div className="p-table__footrow__cell cell right">{volume}</div>
      </div>
    </div>
  )
}

export default Table