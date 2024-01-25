import * as browser from './browser'
import * as tauri from './tauri'

export interface SwaggerDocument {
  name: string
  address: string
}

const isTauriEnv = () => window && window.__TAURI__

export const saveDocumentLocally = async (document: SwaggerDocument) => {
  if (isTauriEnv()) {
    await tauri.saveDocumentLocally(document)
  } else {
    browser.saveDocumentLocally(document)
  }
}
