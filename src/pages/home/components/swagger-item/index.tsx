import { type SwaggerDocument } from '@/utils'
import styles from './index.module.less'
export interface SwaggerItemProps {
  record: SwaggerDocument
}

const SwaggerItem: React.FC<SwaggerItemProps> = (props) => {
  const { record } = props
  return (
    <div className={styles.swaggerItem}>
      <div className={styles.swaggerItemName}>
        { record.name }
      </div>
      <div className={styles.swaggerItemAddr}>
        { record.address }
      </div>
    </div>
  )
}

export default SwaggerItem
