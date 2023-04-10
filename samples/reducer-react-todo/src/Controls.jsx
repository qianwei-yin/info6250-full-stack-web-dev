function Controls({ onLogout, onRefresh }) {
  return (
    <div className="controls">
      <button onClick={onRefresh} className="controls__refresh">Refresh</button>
      <button onClick={onLogout} className="controls__logout">Logout</button>
    </div>
  );
}

export default Controls;
