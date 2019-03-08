class ProxyObject {
  listenerMap = new Map()
  visitSet = new Set()
  proxyCache = new WeakMap()
  constructor(object) {
    const plainObject = plain(object)
    this.jar = this
    this.plainObject = plainObject
    this.proxy = new Proxy(plainObject, {
      get: (o, p) => {
        if (typeof p !== 'symbol') this.visitSet.add(p)
        else return this[p.toString().slice(7, -1)]
        if (o[p] instanceof Object) {
          if (!this.proxyCache.has(o[p])) this.proxyCache.set(o[p], new ProxyObject(o[p]))
          return this.proxyCache.get(o[p])
        }
        return o[p]
      },
      set: (o, p, v) => {
        if (v !== o[p]) this.listenerMap.forEach((tree, fn) => (p in tree ? fn(o[p], (o[p] = v), p) : null))
        return true
      },
    })
    return this.proxy
  }
}

function subscribe(o, listener, tree = {}) {
  if (o instanceof Object) {
    const unsubscribe = {}
    jar(o).listenerMap.set(listener, tree)
    for (const p in o) if (p in tree) unsubscribe[p] = subscribe(o[p], listener, tree[p] ? tree[p] : {})
    return () => {
      jar(o).listenerMap.delete(listener)
      for (const f in unsubscribe) unsubscribe[f]()
    }
  } else return () => {}
}

function visitTree(o) {
  const tree = {}
  if (o instanceof Object) jar(o).visitSet.forEach(p => (tree[p] = visitTree(o[p])))
  return tree
}

function plain(o) {
  return jar(o) ? plain(jar(o).plainObject) : o
}

function jar(o) {
  return o[Symbol('jar')]
}

export { subscribe, visitTree, plain, jar }
export default ProxyObject
