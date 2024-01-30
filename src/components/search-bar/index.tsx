import { useApiDocStore } from '@/store/api-doc'
import { AutoComplete, Form, type SelectProps } from 'antd'
import { type BaseOptionType } from 'antd/es/select'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const SearchBar: React.FC<SelectProps> = (props) => {
  const apiDocMap = useApiDocStore((state) => state.apiDocMap)
  const [options, setOptions] = useState<SelectProps['options']>([])
  const { id } = useParams()

  const handleSearch = (keyword: string) => {
    const apiDoc = apiDocMap.get(id!)!
    if (!apiDoc) {
      return
    }

    const { resourceList } = apiDoc
    const apis: BaseOptionType[] = []
    resourceList.forEach((item) => {
      for (const [api] of Object.entries(item.paths)) {
        if (api.includes(keyword)) {
          apis.push({ label: api, value: api })
          if (api.length > 10) {
            break
          }
        }
      }
    })
    console.log(apis)

    setOptions([{ label: 'api', options: apis }])
  }

  return (
    <Form autoCorrect="off">
      <AutoComplete
        style={{ width: '280px' }}
        filterOption={false}
        onSearch={handleSearch}
        showSearch
        options={options}
        {...props}
      ></AutoComplete>
    </Form>
  )
}

export default SearchBar
