import { v4 as uuidv4 } from 'uuid'

export interface SwaggerDocumentOptions {
  id?: string
  name: string
  address: string
}

export default class SwaggerDocument {
  id: string
  name: string
  address: string

  constructor (options: SwaggerDocumentOptions) {
    const { id, name, address } = options
    this.id = id ?? uuidv4()
    this.name = name
    this.address = address
  }
}
