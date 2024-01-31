let queue: Function[] = []

export function pushQueue (func: Function) {
  queue.push(func)
}

export function flushQueue () {
  const funcList = queue
  queue = []
  funcList.forEach(func => func())
}
