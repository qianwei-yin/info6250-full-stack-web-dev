# Expense Record Web Application

A web app that can be used to record user's income and expenses, with desired categories and self-defined accounts.

Check the [live site](https://expense-ygef.onrender.com).
⬆️ It might take 30s to launch, because I use the free-tier of deployment at [render](https://dashboard.render.com). This is their policy.

### Features

1. Dark mode. Needless to say, it will remember your preference even if you change user.
2. Mock login functionality. Allowlist the characters of a username and forbid user "dog". It lets you better try around with a test user functionality.
3. Navigation bar on the top after logging in. Use it to navigate to other "page". (Basically it is a single page application, I just use conditional rendering to mock page change.)
4. Time picker, you can check your transaction records by different dimensions of time, like Year, Month...
5. Sort your transactions.
6. Paginate your transactions, it is set to 10 items per page.
7. Set your default account, the default account will automatically appear when you are trying to create a new transaction record.
8. Add/Delete a category/account.
9. Responsive styles on desktop sizes (>= 800 px).
10. Multiple loading effects. You can set Network to "Slow 3G" to test it out.

### How to use

1. On the Login page, you can input a valid username and log in to discover a brand new app without any previous data.
2. On the Login page, you can also log in as test user, which will lead you to Conway's data, this is for TA and Professor's better using. There are many mock data to try.
3. On the Dashboard page, there is a bill according to your chosen time range.
4. On the Add page, you can create a new transaction, or cancle all the inputs if you don't want to create a new one midway through. Also, you can update a transaction's details or delete it.
5. On the Settings page, you can add or delete a category and account.

All the icons located in /src/icons are from [Fonticons, Inc., a Delaware corporation](https://fontawesome.com/license#license).
