const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const fallbackHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
const fallbackProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : `${fallbackProtocol}//${fallbackHost}:8000/api`

export function buildEndpoint(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export async function fetchApi(resource, options = {}) {
  const url = buildEndpoint(resource)
  const response = await fetch(url, options)

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText)
    throw new Error(message || `Unable to load ${resource}`)
  }

  return response.json()
}

export function extractList(payload, fieldName) {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  const field = payload[fieldName]
  if (Array.isArray(field)) return field
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  return []
}

export function extractPagination(payload) {
  return payload?.pagination || payload?.meta || null
}
