import type SwaggerDocument from '@/class/SwaggerDocument'
import { create } from 'zustand'

export interface MenuStoreState {
  menuList: SwaggerDocument[]
  activeMenu: Record<string, { specName: string }>
  updateActiveMenu: (menuId: string, specName: string) => void
  addMenu: (menu: SwaggerDocument) => void
}

const menuMap = new Map<string, SwaggerDocument>()
const hasMenu = (menu: SwaggerDocument) => menuMap.has(menu.id)

export const useMenuStore = create<MenuStoreState>((set) => ({
  menuList: [],
  activeMenu: {},
  updateActiveMenu: (menuId: string, specName: string) => {
    set((state) => {
      const activeMenu = { ...state.activeMenu, [menuId]: { specName } }
      return { activeMenu }
    })
  },
  addMenu: (menu) => {
    const target = hasMenu(menu)
    if (target) {
      return
    }

    menuMap.set(menu.id, menu)
    set((state) => {
      const result = [...state.menuList]
      result.push(menu)

      return { menuList: result }
    })
  }
}))
