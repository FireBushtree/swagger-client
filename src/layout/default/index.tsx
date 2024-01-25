import { Outlet } from 'react-router-dom'
import SideBar from './components/side-bar'
import styles from './index.module.less'

const Default: React.FC = () => {
  return (
    <div className={styles.default}>
      <SideBar />
      <Outlet />
    </div>
  )
}
export default Default
