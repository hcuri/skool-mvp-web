import { useEffect, useMemo, useState } from 'react'
import {
  getCommunities,
  createCommunity,
  getPosts,
  createPost,
} from './api'
import CommunitiesList from './components/CommunitiesList'
import CommunityForm from './components/CommunityForm'
import PostsList from './components/PostsList'
import PostForm from './components/PostForm'

export default function App() {
  const [communities, setCommunities] = useState([])
  const [selectedCommunityId, setSelectedCommunityId] = useState(null)
  const [posts, setPosts] = useState([])

  const [loadingCommunities, setLoadingCommunities] = useState(false)
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const selectedCommunity = useMemo(
    () => communities.find((c) => c.id === selectedCommunityId) || null,
    [communities, selectedCommunityId],
  )

  useEffect(() => {
    loadCommunities()
  }, [])

  useEffect(() => {
    if (selectedCommunityId) {
      loadPosts(selectedCommunityId)
    } else {
      setPosts([])
    }
  }, [selectedCommunityId])

  async function loadCommunities() {
    setLoadingCommunities(true)
    setError('')
    try {
      const data = await getCommunities()
      setCommunities(data)
      if (!selectedCommunityId && data.length > 0) {
        setSelectedCommunityId(data[0].id)
      }
    } catch (err) {
      setError(err.message || 'Failed to load communities')
    } finally {
      setLoadingCommunities(false)
    }
  }

  async function loadPosts(communityId) {
    setLoadingPosts(true)
    setError('')
    try {
      const data = await getPosts(communityId)
      setPosts(data)
    } catch (err) {
      setError(err.message || 'Failed to load posts')
    } finally {
      setLoadingPosts(false)
    }
  }

  async function handleCreateCommunity(input) {
    setError('')
    setMessage('')
    try {
      const created = await createCommunity(input.name, input.description)
      setCommunities((prev) => [created, ...prev])
      setSelectedCommunityId(created.id)
      setMessage('Community created successfully')
    } catch (err) {
      setError(err.message || 'Failed to create community')
    }
  }

  async function handleCreatePost(input) {
    if (!selectedCommunityId) return
    setError('')
    setMessage('')
    try {
      const created = await createPost(
        selectedCommunityId,
        input.title,
        input.content,
      )
      setPosts((prev) => [created, ...prev])
      setMessage('Post created successfully')
    } catch (err) {
      setError(err.message || 'Failed to create post')
    }
  }

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Skool MVP</p>
          <h1>Communities & Posts</h1>
        </div>
        <div className="meta">API: {import.meta.env.VITE_API_BASE_URL || 'same-origin'}</div>
      </header>

      {(error || message) && (
        <div className={error ? 'alert error' : 'alert success'}>
          {error || message}
        </div>
      )}

      <div className="layout">
        <section className="card">
          <div className="section-header">
            <h2>Communities</h2>
            {loadingCommunities && <span className="pill">Loading…</span>}
          </div>
          <CommunityForm onCreate={handleCreateCommunity} />
          <CommunitiesList
            communities={communities}
            selectedId={selectedCommunityId}
            onSelect={setSelectedCommunityId}
          />
        </section>

        <section className="card">
          <div className="section-header">
            <h2>Posts</h2>
            {loadingPosts && selectedCommunity && (
              <span className="pill">Loading…</span>
            )}
          </div>

          {selectedCommunity ? (
            <>
              <p className="muted">
                Viewing posts in <strong>{selectedCommunity.name}</strong>
              </p>
              <PostForm onCreate={handleCreatePost} />
              <PostsList posts={posts} />
            </>
          ) : (
            <p className="muted">Select or create a community to see posts.</p>
          )}
        </section>
      </div>
    </div>
  )
}
