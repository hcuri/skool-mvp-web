const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text()
    const message = text || res.statusText || 'Request failed'
    throw new Error(message)
  }
  return res.json()
}

export async function getCommunities() {
  const res = await fetch(`${API_BASE_URL}/communities`)
  return handleResponse(res)
}

export async function createCommunity(name, description) {
  const res = await fetch(`${API_BASE_URL}/communities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  })
  return handleResponse(res)
}

export async function getPosts(communityId) {
  const res = await fetch(`${API_BASE_URL}/communities/${communityId}/posts`)
  return handleResponse(res)
}

export async function createPost(communityId, title, content) {
  const res = await fetch(`${API_BASE_URL}/communities/${communityId}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  })
  return handleResponse(res)
}
