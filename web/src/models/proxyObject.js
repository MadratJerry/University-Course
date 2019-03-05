const subscribeSymbol = Symbol('subscribe')
const plainSymbol = Symbol('plain')
const visitSymbol = Symbol('visit')

class ProxyObject {
  constructor(object) {
    const listenerSet = new Set()
    const proxyCache = new Map()
    const visitSet = new Set()
    const changeSet = new Set()
    const proxy = new Proxy(object, {
      get: function(o, p) {
        if (typeof p !== 'symbol') visitSet.add(p)
        if (p === plainSymbol) return object
        if (p === subscribeSymbol) return listenerSet
        if (p === visitSymbol) return visitSet
        if (o[p] instanceof Object) {
          if (!proxyCache.get(p)) proxyCache.set(p, new ProxyObject(o[p]))
          return proxyCache.get(p)
        }
        return o[p]
      },
      set: function(o, p, v) {
        if (v !== o[p]) {
          changeSet.add(p)
          listenerSet.forEach(f => f(o[p], v, p))
          o[p] = v
        }
        return true
      },
    })
    return proxy
  }
}

function subscribe(obj, listener, tree = {}) {
  if (obj instanceof Object) {
    obj[subscribeSymbol].add((pv, v, p) =>
      p in tree ? listener(pv, v, p) : null,
    )
    for (const p in obj) {
      if (p in tree) subscribe(obj[p], listener, tree[p] ? tree[p] : {})
    }
    return obj
  }
}

function visitTree(obj) {
  const tree = {}
  if (obj instanceof Object)
    obj[visitSymbol].forEach(p => (tree[p] = visitTree(obj[p])))
  return tree
}

export default ProxyObject
export { subscribe, visitTree }
