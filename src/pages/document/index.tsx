import Api, { type SwaggerResourcesRes } from '@/class/Api'
import { useDocumentStore } from '@/store/document'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Select, Skeleton } from 'antd'
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
import styles from './index.module.less'
import { useApiDocStore } from '@/store/api-doc'
import SearchBar from '@/components/search-bar'

export default function Document () {
  const routerParams = useParams()
  const { id } = routerParams
  // cache vars
  const apiDocMap = useApiDocStore((state) => state.apiDocMap)
  const currentApiDoc = apiDocMap.get(id!)

  const addApiDoc = useApiDocStore((state) => state.addApiDoc)

  // basic vars
  const documentList = useDocumentStore((state) => state.documentList)
  const swagger = documentList.find((item) => item.id === id)!
  const [currentResource, setCurrentResource] = useState<string>()
  const [resourceList, setResourceList] = useState<SwaggerResourcesRes>([])
  const apiInstance = new Api(swagger.address)
  const showApiDoc = currentApiDoc && currentResource

  const initResource = (list: SwaggerResourcesRes) => {
    const [first] = list
    setResourceList(list)
    first && setCurrentResource(first.name)
  }

  const getResourceList = async () => {
    const res = await apiInstance.getSwaggerResources()
    if (res.ok) {
      const list = res.data
      initResource(list)
      getApiDocList(list)
    }
  }

  const getApiDocList = async (resource: SwaggerResourcesRes) => {
    // do request
    try {
      const res = await Promise.all(
        resource.map(
          async (item) => await apiInstance.getApiDocs(item.location)
        )
      )
      const resourceList = res.map((item, index) => ({
        ...resource[index],
        ...item.data
      }))
      addApiDoc({ id: id!, resourceList })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (currentApiDoc) {
      initResource(currentApiDoc.resourceList)
    } else {
      getResourceList()
    }
  }, [id])

  useEffect(() => {
    if (!currentApiDoc || !currentResource) {
      return
    }

    const { resourceList } = currentApiDoc
    const spec = resourceList.find(item => item.name === currentResource)

    SwaggerUI({
      dom_id: '#swagger-content',
      docExpansion: 'none',
      spec
    })
  }, [id, showApiDoc])

  return (
    <div className={styles.document}>
      <div className={styles.documentHeader}>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
        <div className={styles.spec}>
          <div className={styles.specText}>Select a spec</div>
          <div className={styles.specSelect}>
            <Select
            style={{ width: '280px' }}
            value={currentResource}
            onChange={(val) => {
              setCurrentResource(val)
            }}
            placeholder="please select a spec"
            options={resourceList.map((item) => ({
              label: item.name,
              value: item.name
            }))}
          />
          </div>
        </div>
      </div>

      {
        showApiDoc
          ? (
            <div className={styles.documentContent}>
              <div id="swagger-content"></div>
            </div>
            )
          : (
            <div className={styles.documentLoading}>
              <Skeleton active paragraph={{ rows: 10 }} />
            </div>
            )
      }

    </div>
  )
}
