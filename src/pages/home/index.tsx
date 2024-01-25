import SwaggerItem from './components/swagger-item'
import SwaggerForm from './components/swagger-form'
import styles from './index.module.less'
import { useState } from 'react'

export default function Home () {
  const [showSwaggerForm, setShowSwaggerForm] = useState(false)

  return (
    <div className={styles.home}>
      <div className={styles.swaggerList}>
        <div className={styles.swaggerBlock}>
          <div onClick={() => { setShowSwaggerForm(true) }} className={styles.create}></div>
        </div>

        <div className={styles.swaggerBlock}>
          <SwaggerItem />
        </div>
      </div>

      { showSwaggerForm && <SwaggerForm onClose={() => { setShowSwaggerForm(false) }} /> }
    </div>
  )
}
