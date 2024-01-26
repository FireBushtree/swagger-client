import Api, { type SwaggerResourcesResItem } from '@/class/Api'
import { useDocumentStore } from '@/store/document'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Input, Select } from 'antd'
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
import styles from './index.module.less'

export default function Document () {
  const routerParams = useParams()
  const { id } = routerParams
  const documentList = useDocumentStore((state) => state.documentList)
  const swagger = documentList.find((item) => item.id === id)!
  const [currentResource, setCurrentResource] = useState<string>()
  const [resourceList, setResourceList] = useState<SwaggerResourcesResItem[]>(
    []
  )
  const apiInstance = new Api(swagger.address)

  const getResourceList = async () => {
    const res = await apiInstance.getSwaggerResources()
    if (res.ok) {
      const list = res.data
      const [first] = list
      setResourceList(list)

      first && setCurrentResource(first.url)
    }
  }

  useEffect(() => {
    getResourceList()
  }, [])

  useEffect(() => {
    if (!currentResource) {
      return
    }

    SwaggerUI({
      dom_id: '#swagger-content',
      docExpansion: 'none',
      url: apiInstance.getApiDocsAddress(currentResource)
    })
  }, [currentResource])

  return (
    <div className={styles.document}>
      <div className={styles.documentHeader}>
        <div className={styles.searchBar}>
          <Input placeholder="please input keyword" />
        </div>
        <div className={styles.spec}>
          <div className={styles.specText}>Select a spec</div>
          <div className={styles.specSelect}>
            <Select
              style={{ width: '280px' }}
              value={currentResource}
              onChange={(val) => { setCurrentResource(val) }}
              placeholder="please select a spec"
              options={resourceList.map((item) => ({
                label: item.name,
                value: item.url
              }))}
            />
          </div>
        </div>
      </div>
      <div className={styles.documentContent}>
        <div id='swagger-content'></div>
      </div>
    </div>
  )
}
