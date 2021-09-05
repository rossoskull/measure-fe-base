import { saveAs } from 'file-saver'

/**
 * Function to save a file
 * @param data Data to be saved in the file
 * @param fileName Name of the file
 * @param fileType Type of the file, default is csv
 */
const saveFile = (data: Blob, fileName: string, fileType = 'csv') => {
  if (data) {
    saveAs(data, `${fileName}.${fileType}`)
  }
}

export {
  saveFile
}