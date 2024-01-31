import { useApiDocStore } from '@/store/api-doc'
import { Select, Form, type SelectProps } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  type SearchTagOption,
  searchApi,
  searchTag,
  type SearchApiOption,
  handleTagSearch,
  handleApiSearch
} from './utils'
import { type DefaultOptionType } from 'antd/es/select'

let apiOptionMap: Map<string, SearchApiOption>
let tagOptionMap: Map<string, SearchTagOption>
const SearchBar: React.FC<SelectProps> = (props) => {
  const [searchValue, setSearchValue] = useState<string>()

  const apiDocMap = useApiDocStore((state) => state.apiDocMap)
  const [options, setOptions] = useState<SelectProps['options']>([])
  const { id } = useParams()

  const handleSearch = (keyword: string) => {
    if (!keyword) {
      setOptions([])
      return
    }

    const apiDoc = apiDocMap.get(id!)!
    if (!apiDoc) {
      return
    }

    const { resourceList } = apiDoc
    const { apiOptions, apiOptionMap: apiMap } = searchApi(resourceList, keyword)
    const { tagOptions, tagOptionMap: tagMap } = searchTag(
      resourceList,
      keyword
    )
    const result: DefaultOptionType[] = []
    apiOptionMap = apiMap
    tagOptionMap = tagMap
    !!tagOptions.length && result.push({ label: 'tag', options: tagOptions })
    !!apiOptions.length && result.push({ label: 'api', options: apiOptions })
    setOptions(result)
  }

  const handleSearchValueChange = (val: string) => {
    setSearchValue('')
    setTimeout(() => {
      setSearchValue(undefined)
    })

    const tag = tagOptionMap.get(val)
    if (tag) {
      handleTagSearch(tag)
    }

    const api = apiOptionMap.get(val)
    if (api) {
      handleApiSearch(api)
    }
  }

  return (
    <Form autoCorrect="off">
      <Select
        value={searchValue}
        onChange={handleSearchValueChange}
        style={{ width: '280px' }}
        filterOption={false}
        onSearch={handleSearch}
        showSearch
        options={options}
        placeholder="please input tag or url"
        {...props}
      />
    </Form>
  )
}

export default SearchBar
