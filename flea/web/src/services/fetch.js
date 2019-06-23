export async function request(url, method = 'GET', data, option) {
  const defaultOption = {
    method,
    // js对象→json
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await fetch(`/api${url}`, { ...defaultOption, ...option })
  let json
  try {
    // json→js对象
    json = await response.json()
  } catch (e) {
    json = null
  }
  return {
    response,
    data: json,
  }
}

export const params = (v, dv = {}) => {
  Object.keys(v).forEach(k => (v[k] === undefined ? delete v[k] : null))
  return Object.keys(Object.assign(dv, v))
    .map(key => `${key}=${dv[key]}`)
    .join('&')
}
