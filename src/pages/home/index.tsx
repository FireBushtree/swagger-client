import SwaggerItem from './components/swagger-item'
import SwaggerForm from './components/swagger-form'
import styles from './index.module.less'
import { useState } from 'react'
import { useDocumentStore } from '@/store/document'
import type SwaggerDocument from '@/class/SwaggerDocument'

export default function Home () {
  const [currentDoc, setCurrentDoc] = useState<SwaggerDocument>()
  const [showSwaggerForm, setShowSwaggerForm] = useState(false)
  const documentList = useDocumentStore((state) => state.documentList)

  const hasDocument = documentList.length > 0
  const showEditDialog = (record: SwaggerDocument) => {
    setShowSwaggerForm(true)
    setCurrentDoc(record)
  }

  const closeEditDialog = () => {
    setShowSwaggerForm(false)
    setCurrentDoc(undefined)
  }

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
            <SwaggerItem onEdit={showEditDialog} record={item} />
          </div>
        ))}
      </div>

      {showSwaggerForm && (
        <SwaggerForm
          record={currentDoc}
          onClose={closeEditDialog}
        />
      )}
    </div>
  )
}
