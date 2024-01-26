import { type SwaggerDocument } from '@/utils'
import { create } from 'zustand'

interface DocumentStoreState {
  documentList: SwaggerDocument[]
  updateDocument: (documentList: SwaggerDocument[]) => any
}

export const useDocumentStore = create<DocumentStoreState>((set) => ({
  documentList: [],
  updateDocument: (documentList: SwaggerDocument[]) => { set(() => ({ documentList })) }
}))
