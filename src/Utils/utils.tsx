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