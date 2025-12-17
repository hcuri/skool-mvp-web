export default function CommunitiesList({ communities, selectedId, onSelect }) {
  if (!communities.length) {
    return <p className="muted">No communities yet. Create one to get started.</p>
  }

  return (
    <ul className="list">
      {communities.map((community) => (
        <li
          key={community.id}
          className={community.id === selectedId ? 'list-item active' : 'list-item'}
          onClick={() => onSelect(community.id)}
        >
          <div className="list-title">{community.name}</div>
          {community.description && (
            <div className="list-subtitle">{community.description}</div>
          )}
        </li>
      ))}
    </ul>
  )
}
