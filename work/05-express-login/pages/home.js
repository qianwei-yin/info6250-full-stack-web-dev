const homePage = (username, word) => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="icon" href="./images/favicon.svg" type="image/svg+xml" />
		<link rel="stylesheet" href="./css/styles.css" />

		<title>Word World | Home</title>
	</head>
	<body>
		<div class="home">
			<header class="header">
				<div class="logo">
					<img src="../images/favicon.svg" alt="word world logo" class="logo__img" />
					<h3 class="logo__text"><span>word</span> world</h3>
				</div>
				<div class="user">
					<span class="user__img">${username.slice(0, 1)}</span>
					<span class="user__name">${username}</span>
					<form action="/logout" method="post">
						<button class="btn btn--logout">log out</button>
					</form>
				</div>
			</header>
			<main class="home-section">
				<div class="content">
					<h2 class="content__text">
						<span class="content__name">${username}, </span>
						${word ? 'your word is' : 'you have no word, add one!'}
					</h2>
					${word ? '<span class="content__word">' + word + '</span>' : ''}
				</div>

				<form action="/change" class="form change-form" method="post">
					<h3 class="change-text">Wanna ${word ? 'Change' : 'Add'}?</h3>
					<div class="form-row">
						<label for="word" class="form-label">your new word</label>
						<input type="text" class="form-input" name="word" />
					</div>
					<button type="submit" class="btn btn--submit">submit</button>
				</form>
			</main>
		</div>
	</body>
</html>
`;

module.exports = homePage;
