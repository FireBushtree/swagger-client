import type SwaggerDocument from '@/class/SwaggerDocument'
import { create } from 'zustand'

interface DocumentStoreState {
  documentList: SwaggerDocument[]
  updateDocument: (documentList: SwaggerDocument[]) => any
}

export const useDocumentStore = create<DocumentStoreState>((set) => ({
  documentList: [],
  updateDocument: (documentList) => { set(() => ({ documentList })) }
}))
