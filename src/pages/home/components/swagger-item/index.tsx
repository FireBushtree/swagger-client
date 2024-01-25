import styles from './index.module.less'

const SwaggerItem: React.FC = () => {
  return (
    <div className={styles.swaggerItem}>
      <div className={styles.swaggerItemName}>
        高新区项目
      </div>
      <div className={styles.swaggerItemAddr}>
        http://gxqqf-gateway.cnsaas.com/swagger-ui.html#/
      </div>
    </div>
  )
}

export default SwaggerItem
