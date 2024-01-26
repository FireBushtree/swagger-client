import { Button, App } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { delDocumentLocally, type SwaggerDocument } from '@/utils'
import styles from './index.module.less'
import { useDocumentStore } from '@/store/document'
export interface SwaggerItemProps {
  record: SwaggerDocument
}

const SwaggerItem: React.FC<SwaggerItemProps> = (props) => {
  const { record } = props

  const { modal } = App.useApp()
  const { confirm } = modal
  const updateDocument = useDocumentStore(state => state.updateDocument)

  const showConfirm = () => {
    confirm({
      title: 'Do you want to delete this document?',
      icon: <ExclamationCircleFilled />,
      style: { top: '30%' },
      async onOk () {
        const documentList = await delDocumentLocally(record)
        documentList && updateDocument(documentList)
      },
      onCancel () {
        // do nothing
      }
    })
  }

  return (
    <div className={styles.swaggerItem}>
      <div className={styles.swaggerItemName}>{record.name}</div>
      <div className={styles.swaggerItemAddr}>{record.address}</div>

      <div className={`${styles.swaggerItemAction} ${styles.edit}`}>
        <Button size="small" type="primary" shape="circle">
          <EditOutlined />
        </Button>
      </div>

      <div className={`${styles.swaggerItemAction} ${styles.del}`}>
        <Button onClick={showConfirm} size="small" type="primary" shape="circle" danger>
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  )
}

export default SwaggerItem
