import { type SwaggerDocument } from '.'

const DOCUMENT_LOCALLY_KEY = 'swagger-client-document-config'
export const getDocumentLocally = () => {
  const fileContent = localStorage.getItem(DOCUMENT_LOCALLY_KEY) ?? ''
  try {
    const documentList = JSON.parse(fileContent) as SwaggerDocument[]
    return documentList
  } catch (e) {
    return []
  }
}
export const saveDocumentLocally = (document: SwaggerDocument) => {
  const documentList = getDocumentLocally()
  if (documentList.length > 0) {
    const targetIdx = documentList.findIndex(item => item.address === document.address)
    if (targetIdx === -1) {
      // create
      documentList.push(document)
    } else {
      // update
      documentList[targetIdx] = document
    }

    localStorage.setItem(DOCUMENT_LOCALLY_KEY, JSON.stringify(documentList))
  } else {
    localStorage.setItem(DOCUMENT_LOCALLY_KEY, JSON.stringify([document]))
  }
}
