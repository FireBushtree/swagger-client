import { useDocumentStore } from '@/store/document'
import { getDocumentLocally } from '@/utils'
import { useEffect, useState } from 'react'

export interface ContainerProps {
  children: React.ReactElement
}

const Container: React.FC<ContainerProps> = (props) => {
  const { children } = props
  const [isInit, setIsInit] = useState(false)
  const updateDocument = useDocumentStore((state) => state.updateDocument)
  const initDocument = async () => {
    const documentList = await getDocumentLocally()
    updateDocument(documentList)
    setIsInit(true)
  }

  useEffect(() => {
    initDocument()
  }, [])

  return isInit ? children : null
}
export default Container
