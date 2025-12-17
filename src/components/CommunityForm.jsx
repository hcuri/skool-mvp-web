import { useState } from 'react'

export default function CommunityForm({ onCreate }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onCreate({ name: name.trim(), description: description.trim() })
    setName('')
    setDescription('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="community-name">Name</label>
        <input
          id="community-name"
          placeholder="Community name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="community-description">Description</label>
        <input
          id="community-description"
          placeholder="What is this community about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="button">
        Create Community
      </button>
    </form>
  )
}
