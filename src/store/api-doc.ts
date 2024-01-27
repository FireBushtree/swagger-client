import { type ApiDocRes } from '@/class/Api'
import { create } from 'zustand'

export type Resource = {
  name: string
} & ApiDocRes

export interface ApiDoc {
  id: string
  resourceList: Resource[]
}

export interface ApiDocStoreState {
  apiDocList: ApiDoc[]
  apiDocMap: Map<string, ApiDoc>
  addApiDoc: (apiDoc: ApiDoc) => void
}

export const useApiDocStore = create<ApiDocStoreState>(set => ({
  apiDocList: [],
  apiDocMap: new Map(),
  addApiDoc: (apiDoc) => {
    set((state) => {
      const newList = [...state.apiDocList]
      newList.push(apiDoc)

      const newMap = new Map(state.apiDocMap)
      newMap.set(apiDoc.id, apiDoc)
      return { apiDocList: newList, apiDocMap: newMap }
    })
  }
}))
