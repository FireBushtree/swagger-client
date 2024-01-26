import { BaseDirectory, createDir, exists, readTextFile, writeFile } from '@tauri-apps/api/fs'
import { type SwaggerDocument } from '.'

export const CONFIG_FILE_NAME = 'swagger-client.conf.json'
const appDataDir = BaseDirectory.AppData

export async function createConfigDir () {
  await createDir('', { dir: appDataDir, recursive: true })
}

export async function hasConfigFile () {
  return await exists(CONFIG_FILE_NAME, { dir: appDataDir })
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

export const saveDocumentLocally = async (document: SwaggerDocument) => {
  const hasFile = await hasConfigFile()

  if (hasFile) {
    const documentList = await getDocumentLocally()
    const targetIdx = documentList.findIndex(item => item.address === document.address)
    if (targetIdx === -1) {
      // create
      documentList.push(document)
    } else {
      // update
      documentList[targetIdx] = document
    }

    await writeFile(CONFIG_FILE_NAME, JSON.stringify(documentList), { dir: appDataDir })
    return documentList
  } else {
    await createConfigDir()
    await writeFile(CONFIG_FILE_NAME, JSON.stringify([document]), { dir: appDataDir })
    return [document]
  }
}
