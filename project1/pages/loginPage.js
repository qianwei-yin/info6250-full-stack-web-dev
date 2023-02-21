const loginPage = (alertParams) => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />

		<link rel="stylesheet" href="./css/styles.css" />
		<link rel="stylesheet" href="./css/login.css" />

		<title>Login | Guess My Word</title>
	</head>
	<body>
		<section class="section-center">
			<form action="/login" method="post" class="login__form">
				<h1 class="login__title">log in</h1>
				<p 
				class="alert ${alertParams?.showAlert ? 'show-alert' : ''} alert--${alertParams?.alertType}"
				>
				${alertParams?.alertMessage}
				</p>
				<input type="text" class="login__input" placeholder="User Name" name="username" />
				<button class="login__btn btn--outline" type="submit">log in</button>
			</form>
		</section>

		<footer class="footer">
			&copy; 2023 <span class="footer--company">guess my word</span> All rights reserved.
		</footer>
	</body>
</html>
`;

module.exports = loginPage;
