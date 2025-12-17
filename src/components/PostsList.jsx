export default function PostsList({ posts }) {
  if (!posts.length) {
    return <p className="muted">No posts yet. Be the first to post.</p>
  }

  return (
    <div className="posts">
      {posts.map((post) => (
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
