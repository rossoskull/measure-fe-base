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
