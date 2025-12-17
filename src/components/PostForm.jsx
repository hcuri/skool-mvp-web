import { useState } from 'react'

export default function PostForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    onCreate({ title: title.trim(), content: content.trim() })
    setTitle('')
    setContent('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="post-content">Content</label>
        <textarea
          id="post-content"
          placeholder="Share something with the community"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
        />
      </div>
      <button type="submit" className="button">
        Create Post
      </button>
    </form>
  )
}
