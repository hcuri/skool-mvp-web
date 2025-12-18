const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

function url(path) {
  if (!API_BASE_URL) return path
  return `${API_BASE_URL}${path}`
}

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text()
    const message = text || res.statusText || 'Request failed'
    throw new Error(message)
  }
  return res.json()
}

export async function getCommunities() {
  const res = await fetch(url('/communities'))
  return handleResponse(res)
}

export async function createCommunity(name, description) {
  const res = await fetch(url('/communities'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  })
  return handleResponse(res)
}

export async function getPosts(communityId) {
  const res = await fetch(url(`/communities/${communityId}/posts`))
  return handleResponse(res)
}

export async function createPost(communityId, title, content) {
  const res = await fetch(url(`/communities/${communityId}/posts`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  })
  return handleResponse(res)
}
