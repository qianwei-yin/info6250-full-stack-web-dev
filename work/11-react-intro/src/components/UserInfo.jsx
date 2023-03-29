const UserInfo = ({ username }) => {
	return (
		<div className="user-info">
			<div className="user-info__avatar">{username.slice(0, 1)}</div>
			<span className="user-info__name">{username}</span>
		</div>
	);
};

export default UserInfo;
