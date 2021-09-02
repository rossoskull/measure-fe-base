import { docListName } from "../constants"

/**
 * Get parsed documents list
 * @returns A list of sr numbers of documents from localStorage
 */
const getLocalDocList = () => {
  const list = localStorage.getItem(docListName)
  if (list) {
    return [...JSON.parse(list)]
  }
  return []
}

/**
 * Save a list of sr numbers to localStorage
 * @param list A list of serial numbers
 * @returns void
 */
const saveLocalDocList = (list: number[]) => {
  const strObj = JSON.stringify(list)
  localStorage.setItem(docListName, strObj)
}

/**
 * Create or add new documents to available documents
 * @returns An updated list of sr numbers
 */
const createAddDocument = (sr: number) => {
  let obj = getLocalDocList()
  obj.push(sr)

  saveLocalDocList(obj)
  return obj
}

/**
 * Delete an element from available documents
 * @returns An updated list of sr numbers
 */
const deleteDocument = (sr: number) => {
  let obj = getLocalDocList()
  const srIndex = obj.findIndex((o) => o === sr)
  obj.splice(srIndex, 1)

  saveLocalDocList(obj)
  return obj
}

/**
 * Get a list of documents with relevant details from localStorage
 * @return A list of documents' sr, customer name and invoice number 
 */
const getDocuments = () => {
  let obj = getLocalDocList()
  return obj
}

export {
  createAddDocument,
  deleteDocument,
  getDocuments
}