export async function request(
  url,
  method = 'GET',
  data,
  option = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  },
) {
  const response = await fetch(`/api${url}`, option)
  let json
  try {
    json = await response.json()
  } catch (e) {
    json = null
  }
  return {
    response,
    data: json,
  }
}
