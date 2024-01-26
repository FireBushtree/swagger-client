import SwaggerItem from './components/swagger-item'
import SwaggerForm from './components/swagger-form'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { useDocumentStore } from '@/store/document'
import { getDocumentLocally } from '@/utils'

export default function Home () {
  const [showSwaggerForm, setShowSwaggerForm] = useState(false)
  const documentList = useDocumentStore((state) => state.documentList)
  const updateDocument = useDocumentStore((state) => state.updateDocument)
  const initDocument = async () => {
    const documentList = await getDocumentLocally()
    updateDocument(documentList)
  }

  useEffect(() => {
    initDocument()
  }, [])

  const hasDocument = documentList.length > 0

  return (
    <div className={styles.home}>
      <div className={styles.swaggerList}>
        <div className={styles.swaggerBlock}>
          <div
            onClick={() => {
              setShowSwaggerForm(true)
            }}
            className={`${styles.create} ${hasDocument ? '' : styles.only}`}
          ></div>
        </div>

        {documentList.map((item, index) => (
          <div className={styles.swaggerBlock} key={item.name + index}>
            <SwaggerItem record={item} />
          </div>
        ))}
      </div>

      {showSwaggerForm && (
        <SwaggerForm
          onClose={() => {
            setShowSwaggerForm(false)
          }}
        />
      )}
    </div>
  )
}
