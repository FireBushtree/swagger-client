import styles from './index.module.less'
import { useLocation, useNavigate } from 'react-router-dom'
import iconHome from '../../images/icon-home.svg'
import iconHomeActive from '../../images/icon-home-active.svg'
import { useMenuStore } from '@/store/menu'
import type SwaggerDocument from '@/class/SwaggerDocument'

export interface Menu {
  label: string
  icon: string
  path: string
  activeIcon: string
}

export default function SideBar () {
  const menuList = [
    {
      label: 'home',
      icon: iconHome,
      activeIcon: iconHomeActive,
      path: '/home'
    }
  ]
  const swaggerMenu = useMenuStore((state) => state.menuList)
  const location = useLocation()
  const navigate = useNavigate()

  const renderMenuItem = (record: Menu) => {
    const isActive = record.path === location.pathname
    return (
      <div
        onClick={() => {
          navigate(record.path)
        }}
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

  const renderSwaggerMenu = (record: SwaggerDocument) => {
    const isActive = location.pathname.includes(record.id)
    const firstStr = record.name[0]
    return (
      <div
        onClick={() => {
          navigate(`/doc/${record.id}`)
        }}
        className={`${styles.menuItem} ${isActive ? styles.isActive : ''}`}
        key={record.id}
      >
        <div>{firstStr}</div>
      </div>
    )
  }

  return (
    <div className={styles.sideBar}>
      <div className={styles.icon}>
        <img src="/icon.png" alt="icon" />
      </div>

      <div className={styles.menuList}>
        {menuList.map(renderMenuItem)}
        {swaggerMenu.map(renderSwaggerMenu)}
      </div>
    </div>
  )
}
