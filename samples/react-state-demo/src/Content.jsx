function Content({ username, onLogout }) {
  return (
    <div>
      Hello {username}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Content;
