import type { FetchOptions, Response } from '@tauri-apps/api/http'
import { fetch } from '@tauri-apps/api/http'

const swaggerResources = '/swagger-resources'
const slash = '/'

export interface SwaggerResourcesResItem {
  location: string
  name: string
  url: string
}

export interface ApiDocParameter {
  default?: any
  description: string
  in: string
  name: string
  required: boolean
  type?: string
  schema?: { $ref: string, originalRef: string }
}

export type SwaggerResourcesRes = SwaggerResourcesResItem[]
export interface ApiDocTag { name: string, description: string }
export interface ApiDocPath {
  consumes: string[]
  deprecated: boolean
  operationId: string
  summary: string
  parameters: ApiDocParameter[]
  tags: string[]
}

export interface DefinitionProperty {
  type: string
  description?: string
}
export interface Definition {
  type: string
  title: string
  properties: Record<string, DefinitionProperty>
}
export interface ApiDocRes {
  basePath: string
  tags: ApiDocTag[]
  paths: Record<string, Record<string, ApiDocPath>>
  definitions: Record<string, Definition>
}

export default class Api {
  baseUrl?: string

  constructor (baseUrl: string) {
    if (!baseUrl) {
      return
    }

    this.baseUrl = baseUrl.endsWith(slash) ? baseUrl.slice(0, -1) : baseUrl
  }

  async request<T>(url: string, options?: FetchOptions) {
    return await new Promise<Response<T>>((resolve, reject) => {
      fetch<T>(`${this.baseUrl}${url}`, {
        method: 'GET',
        ...options
      }).then((res) => {
        if (res.ok) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  async getSwaggerResources () {
    return await this.request<SwaggerResourcesRes>(swaggerResources)
  }

  getApiDocsAddress (suffix: string) {
    return `${this.baseUrl}${suffix}`
  }

  async getApiDocs (suffix: string) {
    return await this.request<ApiDocRes>(suffix)
  }
}
