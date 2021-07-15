/** DataEntry class */
export class DataEntry {
  sr: number
  height: number
  width: number
  length: number

  constructor (sr: number, height: number, width: number, length: number) {
    this.sr = sr
    this.height = height
    this.width = width
    this.length = length
  }

  getVolume = () => {
    return ((this.height * this.width * this.length) / 144).toFixed(3)
  }

  getCSV = () => {
    return `${this.sr},${this.height},${this.width},${this.length}`
  }

  setSr = (sr: number) => {
    this.sr = sr
    return this.sr
  }
}

/** Add data to localStorage */
export const addListToLocalStorage = (list: Array<DataEntry>) => {
  let str = ''

  list.forEach((item, idx) => {
    const csv = item.getCSV()
    if (idx < list.length - 1) {
      str = `${str}${csv}|`
    } else {
      str = `${str}${csv}`
    }
  })

  localStorage.setItem('previousData', str)
}

/** Check if list exists in storage */
export const isListInStorage = () => {
  const str = localStorage.getItem('previousData') || ''
  if (str.length > 0) {
    return true
  }
  return false
}

/** Get data list from localstorage */
export const getListFromStorage = () => {
  const str = localStorage.getItem('previousData')
  const dataListArray: Array<DataEntry> = []
  if (str!.length > 0) {
    const csvList = str!.split('|')

    csvList.forEach((csv) => {
      const data = csv!.split(',') || ['0', '0', '0', '0']
      const entry = new DataEntry(parseFloat(data[0]), parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]))

      dataListArray.push(entry)
    })    
  }

  return dataListArray
}

/** Get serial number of doc */
export const getSr = () => {
  const str = localStorage.getItem('sr')
  return str
}

/** Set new serial number */
export const setNewSr = () => {
  const str = getSr()

  if (!str) {
    localStorage.setItem('sr', '1')
    return '1'
  } else {
    const intSr = parseInt(str)
    const newSr = (intSr + 1).toString()
    localStorage.setItem('sr', newSr)
    return newSr
  }
}

/** Set new sr with value */
export const setNewSrWithValue = (value: string) => {
  localStorage.setItem('sr', value)
}

/** Set customer data */
export const setCustomerData = (customerName: string, invoiceNo: string, productName: string) => {
  const obj = {
    customer: customerName,
    invoice: invoiceNo,
    product: productName
  }

  localStorage.setItem('cdata', JSON.stringify(obj))
}

/** Get customer data */
export const getCustomerData = () => {
  const cData = localStorage.getItem('cdata')
  if (cData) {
    const obj = JSON.parse(cData)
    if (obj) {
      return obj
    }
  }

  return {}
}