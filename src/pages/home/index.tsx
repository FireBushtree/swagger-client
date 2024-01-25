import SwaggerItem from './components/swagger-item'
import styles from './index.module.less'

export default function Home () {
  return (
    <div className={styles.home}>
      <div className={styles.swaggerList}>
        <div className={styles.swaggerBlock}>
          <div className={styles.create}></div>
        </div>

        <div className={styles.swaggerBlock}>
          <SwaggerItem />
        </div>
      </div>
    </div>
  )
}
