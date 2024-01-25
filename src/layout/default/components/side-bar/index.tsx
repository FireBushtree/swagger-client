import styles from './index.module.less'
import { useLocation } from 'react-router-dom'
import iconHome from '../../images/icon-home.svg'
import iconHomeActive from '../../images/icon-home-active.svg'

export interface Menu {
  label: string
  icon: string
  path: string
  activeIcon: string
}

export default function SideBar () {
  const menuList = [
    { label: 'home', icon: iconHome, activeIcon: iconHomeActive, path: '/' }
  ]
  const location = useLocation()

  const renderMenuItem = (record: Menu) => {
    const isActive = record.path === location.pathname
    return (
      <div
        className={`${styles.menuItem} ${isActive ? styles.isActive : ''}`}
        key={record.label}
      >
        <img
          className={styles.menuItemIcon}
          src={isActive ? record.activeIcon : record.icon}
        />
      </div>
    )
  }

  return (
    <div className={styles.sideBar}>
      <div className={styles.icon}>
        <img src="/icon.png" alt="icon" />
      </div>

      <div className={styles.menuList}>{menuList.map(renderMenuItem)}</div>
    </div>
  )
}
