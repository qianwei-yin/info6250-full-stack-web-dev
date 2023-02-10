const loginPage = () => `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<link rel="icon" href="../images/favicon.svg" type="image/svg+xml" />
		<link rel="stylesheet" href="../css/styles.css" />

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
				<button type="submit" class="btn btn--block">log in</button>
			</form>
		</main>
	</body>
</html>
`;

module.exports = loginPage;
