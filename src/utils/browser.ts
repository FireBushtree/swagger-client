import type SwaggerDocument from '@/class/SwaggerDocument'
import { findDocumentIdx } from '.'

const DOCUMENT_LOCALLY_KEY = 'swagger-client-document-config'

export function writeConfigFile (documentList: SwaggerDocument[]) {
  localStorage.setItem(DOCUMENT_LOCALLY_KEY, JSON.stringify(documentList))
}

export const getDocumentLocally = () => {
  const fileContent = localStorage.getItem(DOCUMENT_LOCALLY_KEY) ?? ''
  try {
    const documentList = JSON.parse(fileContent) as SwaggerDocument[]
    return documentList
  } catch (e) {
    return []
  }
}

export const delDocumentLocally = (document: SwaggerDocument) => {
  const documentList = getDocumentLocally()
  const targetIdx = findDocumentIdx(documentList, document)

  if (targetIdx === -1) {
    return
  }

  documentList.splice(targetIdx, 1)
  writeConfigFile(documentList)
  return documentList
}

export const saveDocumentLocally = (document: SwaggerDocument) => {
  const documentList = getDocumentLocally()
  if (documentList.length > 0) {
    const targetIdx = findDocumentIdx(documentList, document)
    if (targetIdx === -1) {
      // create
      documentList.push(document)
    } else {
      // update
      documentList[targetIdx] = document
    }

    writeConfigFile(documentList)
    return documentList
  } else {
    writeConfigFile([document])
    return [document]
  }
}
