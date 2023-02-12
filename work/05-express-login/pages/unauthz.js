const unauthzPage = () => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="icon" href="./images/favicon.svg" type="image/svg+xml" />
		<link rel="stylesheet" href="./css/styles.css" />

		<title>Word World | Oops</title>
	</head>
	<body>
		<main class="wrong-name-section">
			<div class="unauthz-content">
				<h2 class="unauthz-text">Oops, it seems that your user name is incorrect!</h2>
				<form class="form-unauthz" action="/" method="get">
					<button class="btn btn--unauthz" type="submit">log in again</button>
				</form>
			</div>
			<img src="../images/unauthz.svg" alt="unauthorized error" class="unauthz-img" />
		</main>
	</body>
</html>
`;

module.exports = unauthzPage;
