const loginPage = () => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="icon" href="./images/favicon.svg" type="image/svg+xml" />
		<link rel="stylesheet" href="./css/styles.css" />

		<title>Word World | Login</title>
	</head>
	<body>
		<main class="login-section">
			<form action="/login" class="form login-form" method="post">
				<div class="logo">
					<img src="../images/favicon.svg" alt="word world logo" class="logo__img" />
					<h3 class="logo__text"><span>word</span> world</h3>
				</div>
				<h3 class="login-text">login</h3>
				<div class="form-row">
					<label for="username" class="form-label">user name</label>
					<input type="text" class="form-input" name="username" />
				</div>
				<button type="submit" class="btn btn--submit">log in</button>
			</form>
		</main>
	</body>
</html>
`;

module.exports = loginPage;
