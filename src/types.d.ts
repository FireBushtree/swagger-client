export {}
declare global {
  interface Window {
    __TAURI__: any // this will be your variable name
  }
}
