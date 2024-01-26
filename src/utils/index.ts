import * as browser from './browser'
import * as tauri from './tauri'

export interface SwaggerDocument {
  name: string
  address: string
}

const isTauriEnv = () => window && window.__TAURI__

export const findDocumentIdx = (documentList: SwaggerDocument[], document: SwaggerDocument) => {
  return documentList.findIndex(item => item.address === document.address)
}

export const getDocumentLocally = async () => {
  if (isTauriEnv()) {
    return await tauri.getDocumentLocally()
  } else {
    return browser.getDocumentLocally()
  }
}

export const saveDocumentLocally = async (document: SwaggerDocument) => {
  if (isTauriEnv()) {
    return await tauri.saveDocumentLocally(document)
  } else {
    return browser.saveDocumentLocally(document)
  }
}

export const delDocumentLocally = async (document: SwaggerDocument) => {
  if (isTauriEnv()) {
    return await tauri.delDocumentLocally(document)
  } else {
    return browser.delDocumentLocally(document)
  }
}
