import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

import Table from './Table/Table'
import { DataEntry, getCustomerData, getListFromStorage, getSr, isListInStorage } from '../../Utils/utils'

import './PrintTable.scss'

const PrintTable = () => {
  /** State */
  const [dataList, setDataList] = useState<DataEntry[]>([])
  const [totalVolume, setTotalVolume] = useState('')
  const [docSr, setDocSr] = useState('')
  const [custData, setCustData] = useState({
    customer: '',
    invoice: '',
    product: ''
  })

  /** Component did mount */
  useEffect(() => {
    if (isListInStorage()) {
      const list = getListFromStorage()
      setDataList(list)

      // Get sr no.
      const sr = getSr() || ''
      setDocSr(sr)

      // Get customer details
      const customerData = getCustomerData()
      if (customerData) {
        setCustData(customerData)
      }
    }
  }, [])

  /** Calculate total volume */
  useEffect(() => {
    let volume = 0.0
    dataList.forEach((item) => volume += parseFloat(item.getVolume()))
    setTotalVolume(volume.toFixed(3))
  }, [dataList])

  const printWindow = () => {
    window.print()
  }

  return (
    <div className="print">
      <button
        className="print__print-button no-print"
        onClick={printWindow}
      >
        <FontAwesomeIcon icon={faPrint} />
      </button>

      <Table
        list={dataList}
        volume={totalVolume}
        sr={docSr}
        customerData={custData}
      />
    </div>
  )
}

export default PrintTable
