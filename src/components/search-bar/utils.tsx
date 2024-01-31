import styles from './index.module.less'
import { type Resource } from '@/store/api-doc'

export type SearchType = 'operationTag' | 'api'

export interface SearchTagOption {
  label: React.ReactNode
  value: string
  specName: string
  tagName: string
  type: SearchType
}

export interface SearchApiOption {
  label: React.ReactNode
  value: string
  specName: string
  url: string
  method: string
  operationId: string
  type: SearchType
}

export function renderApiLabel (specName: string, method: string, url: string) {
  return (
    <div className={styles.label}>
      <span className={styles.specName}>{specName}</span>
      <span className={styles.method}>{method}</span>
      <span className={styles.url}>{url}</span>
    </div>
  )
}

export function renderTagLabel (specName: string, name: string) {
  return (
    <div className={styles.label}>
      <span className={styles.specName}>{specName}</span>
      <span className={styles.tagName}>{name}</span>
    </div>
  )
}

export function handleTagSearch (tag: SearchTagOption) {
  const { tagName } = tag
  const domId = `operations-tag-${tagName}`
  const dom = document.getElementById(domId)
  dom && dom.scrollIntoView()
}

export function handleApiSearch (api: SearchApiOption) {
  console.log(api)
}

export function searchApi (resourceList: Resource[], keyword: string) {
  const apiOptions: SearchApiOption[] = []
  const apiOptionMap = new Map<string, SearchApiOption >()
  const result = { apiOptions, apiOptionMap }

  for (let i = 0; i < resourceList.length; i++) {
    const item = resourceList[i]
    for (const [url, value] of Object.entries(item.paths)) {
      if (url.includes(keyword)) {
        for (const [method, desc] of Object.entries(value)) {
          const specName = item.name
          const { operationId } = desc
          const value = `${specName}-${operationId}`
          const option = {
            label: renderApiLabel(specName, method, url),
            value,
            type: 'api' as SearchType,
            specName,
            url,
            method,
            operationId
          }

          apiOptions.push(option)
          apiOptionMap.set(value, option)

          if (apiOptions.length >= 10) {
            return result
          }
        }
      }
    }
  }

  return result
}

export function searchTag (resourceList: Resource[], keyword: string) {
  const tagOptions: SearchTagOption[] = []
  const tagOptionMap = new Map<string, SearchTagOption>()
  const result = { tagOptions, tagOptionMap }

  for (let i = 0; i < resourceList.length; i++) {
    const item = resourceList[i]
    const { tags } = item
    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j]
      if (tag.name.includes(keyword)) {
        const specName = item.name
        const tagName = tag.name
        const value = `${specName}-${tagName}`
        const option: SearchTagOption = {
          specName,
          tagName,
          type: 'operationTag',
          label: renderTagLabel(specName, tagName),
          value
        }

        tagOptions.push(option)
        tagOptionMap.set(value, option)

        if (tagOptions.length >= 10) {
          return result
        }
      }
    }
  }

  return result
}
