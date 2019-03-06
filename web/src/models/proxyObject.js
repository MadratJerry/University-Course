class ProxyObject {
  listenerMap = new Map()
  visitSet = new Set()
  proxyCache = new Map()
  changeSet = new Set()
  constructor(object) {
    const plainObject = plain(object)
    this.proxy = this
    this.plainObject = plainObject

    return new Proxy(plainObject, {
      get: (o, p) => {
        if (typeof p !== 'symbol') this.visitSet.add(p)
        else return this[p.toString().slice(7, -1)]
        // console.log('get ', p)
        if (o[p] instanceof Object) {
          if (!this.proxyCache.get(p)) this.proxyCache.set(p, new ProxyObject(o[p]))
          return this.proxyCache.get(p)
        }
        return o[p]
      },
      set: (o, p, v) => {
        if (v !== o[p]) {
          this.changeSet.add(p)
          this.listenerMap.forEach((tree, fn) => (p in tree ? fn(o[p], v, p) : null))
          o[p] = v
        }
        return true
      },
    })
  }
}

function subscribe(o, listener, tree = {}) {
  if (o instanceof Object) {
    proxy(o).listenerMap.set(listener, tree)
    for (const p in o) if (p in tree) subscribe(o[p], listener, tree[p] ? tree[p] : {})
    return o
  }
}

function visitTree(o) {
  const tree = {}
  if (o instanceof Object) proxy(o).visitSet.forEach(p => (tree[p] = visitTree(o[p])))
  return tree
}

function plain(o) {
  return proxy(o) ? plain(proxy(o).plainObject) : o
}

function proxy(o) {
  return o[Symbol('proxy')]
}

export { subscribe, visitTree, plain, proxy }
export default ProxyObject
