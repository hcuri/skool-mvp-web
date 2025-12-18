export default function PostsList({ posts }) {
  const safePosts = Array.isArray(posts) ? posts : []

  if (!safePosts.length) {
    return <p className="muted">No posts yet. Be the first to post.</p>
  }

  return (
    <div className="posts">
      {safePosts.map((post) => (
        <article key={post.id} className="post">
          <header>
            <h3>{post.title}</h3>
            <span className="post-meta">{post.createdAt || ''}</span>
          </header>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}
