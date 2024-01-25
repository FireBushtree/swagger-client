import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from './components/side-bar'
import styles from './index.module.less'
import { useEffect } from 'react'

const Default: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/home')
  }, [])
  return (
    <div className={styles.default}>
      <SideBar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
export default Default
