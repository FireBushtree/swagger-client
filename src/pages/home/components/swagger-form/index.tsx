import { useState } from 'react'
import styles from './index.module.less'
import { saveDocumentLocally } from '@/utils'

export interface SwaggerFormProps {
  onClose: () => any
}

const SwaggerForm: React.FC<SwaggerFormProps> = (props) => {
  const { onClose } = props
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [nameError, setNameError] = useState('')
  const [addressError, setAddressError] = useState('')

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError('')
    setName(e.target.value)
  }
  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressError('')
    setAddress(e.target.value)
  }

  const handleSave = async () => {
    // 1. validate
    if (!name) {
      setNameError('please input name')
    }
    if (!address) {
      setAddressError('please input address')
    }

    // 2. save
    await saveDocumentLocally({ name, address })

    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <div className={styles.swaggerForm}>
      <div className={styles.swaggerFormContent}>
        <div className={styles.formBlock}>
          <div className={styles.formBlockLabel}>Name:</div>
          <input
            value={name}
            onChange={handleNameInput}
            className={styles.input}
            placeholder="please input name..."
          />
          <div className={styles.error}>{nameError}</div>
        </div>

        <div className={styles.formBlock}>
          <div className={styles.formBlockLabel}>Address:</div>
          <input
            value={address}
            onChange={handleAddressInput}
            className={styles.input}
            placeholder="please input address..."
          />
        </div>
        <div className={styles.error}>{addressError}</div>
      </div>

      <div className={styles.swaggerFormFooter}>
        <div className={`${styles.button} ${styles.main}`} onClick={handleSave}>
          save
        </div>
        <div className={styles.button} onClick={handleCancel}>
          cancel
        </div>
      </div>
    </div>
  )
}

export default SwaggerForm
