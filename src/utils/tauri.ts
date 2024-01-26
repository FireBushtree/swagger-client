import { BaseDirectory, createDir, exists, readTextFile, writeFile } from '@tauri-apps/api/fs'
import { findDocumentIdx, type SwaggerDocument } from '.'

export const CONFIG_FILE_NAME = 'swagger-client.conf.json'
const appDataDir = BaseDirectory.AppData

export async function createConfigDir () {
  await createDir('', { dir: appDataDir, recursive: true })
}

export async function hasConfigFile () {
  return await exists(CONFIG_FILE_NAME, { dir: appDataDir })
}

export async function writeConfigFile (documentList: SwaggerDocument[]) {
  await writeFile(CONFIG_FILE_NAME, JSON.stringify(documentList), { dir: appDataDir })
}

export async function getDocumentLocally () {
  const fileContent = await readTextFile(CONFIG_FILE_NAME, { dir: appDataDir })
  try {
    const documentList = JSON.parse(fileContent) as SwaggerDocument[]
    return documentList
  } catch (e) {
    return []
  }
}

export const delDocumentLocally = async (document: SwaggerDocument) => {
  const documentList = await getDocumentLocally()
  const targetIdx = findDocumentIdx(documentList, document)

  // no document
  if (targetIdx === -1) {
    return
  }

  documentList.splice(targetIdx, 1)
  await writeConfigFile(documentList)
  return documentList
}

export const saveDocumentLocally = async (document: SwaggerDocument) => {
  const hasFile = await hasConfigFile()

  if (hasFile) {
    const documentList = await getDocumentLocally()
    const targetIdx = findDocumentIdx(documentList, document)
    if (targetIdx === -1) {
      // create
      documentList.push(document)
    } else {
      // update
      documentList[targetIdx] = document
    }

    await writeConfigFile(documentList)
    return documentList
  } else {
    await createConfigDir()
    await writeConfigFile([document])
    return [document]
  }
}
