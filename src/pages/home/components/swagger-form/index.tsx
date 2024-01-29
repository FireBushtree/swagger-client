import { saveDocumentLocally } from '@/utils'
import { useDocumentStore } from '@/store/document'
import SwaggerDocument from '@/class/SwaggerDocument'
import { Form, Input, Modal } from 'antd'
import { useEffect } from 'react'

export interface SwaggerFormProps {
  record?: SwaggerDocument
  visible: boolean
  onClose: () => any
}

const SwaggerForm: React.FC<SwaggerFormProps> = (props) => {
  const updateDocument = useDocumentStore((state) => state.updateDocument)
  const { onClose, record, visible } = props
  const [form] = Form.useForm<{ name: string, address: string }>()

  useEffect(() => {
    if (!record) {
      form.resetFields()
      return
    }

    form.setFieldsValue(record)
  }, [record])

  const handleConfirm = async () => {
    try {
      // 1. validate
      const val = await form.validateFields()

      // 2. save
      const documentList = await saveDocumentLocally(
        new SwaggerDocument({ ...record, ...val })
      )
      updateDocument(documentList)

      onClose()
    } catch (e) {
      // do nothing
    }
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal
      title="Swagger Basic Info"
      open={visible}
      onOk={handleConfirm}
      onCancel={handleCancel}
      forceRender
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'please input name' }]}
        >
          <Input autoCorrect="off" placeholder="please input name" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: 'please input address' },
            {
              pattern: /^((https?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/,
              message: 'please input right address'
            }
          ]}
        >
          <Input autoCorrect="off" placeholder="please input address" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SwaggerForm
