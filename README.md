# Web app template

This document tells you what this web app does so far and how to run it: nothing about how it works or how to use it to develop a full web app. For that information, consult files in the `.cursor/rules` directory, which instruct Cursor IDE LLMs to follow advised architectural patterns but also provide insights on how this web app's code should be written and maintained.

## Functionality so far

The bare necessities that pretty much every web app needs:
- Home page
- Way for users to sign up and log in using their email

## Run the app

### Set environment variables

Create a copy of the `env.sample` file in the `backend` directory and rename it `.env`.

Open a terminal, and from any directory, run the following commands:

```
brew install postgresql@17 redis
brew services start postgresql@17 redis
psql postgres
```

Then run these commands:
```
CREATE DATABASE name-of-your-web-app;
\c name-of-your-web-app
```

Now, you need to determine the absolute path to the `init.sql` file that's in the root directory of this repository. For me, this is `/Users/samcraft/VSCode/web-app-template/init.sql`. With the absolute path, run these commands:

```
\i /absolute/path/to/init.sql
\q
```

Now, set the `PG_URL` variable in the `.env` file:

```
PG_URL=postgresql://your-macOS-username@localhost:5432/name-of-your-web-app
```

In the terminal, generate a secure session secret by running:

```
openssl rand -base64 64
```

Now, set the `SESSION_SECRET` variable:

```
SESSION_SECRET=secure-session-secret-you-generated
```

For development purposes, you can use your personal Google account to populate the email-related environment variables. However, `EMAIL_PASSWORD` is not the typical password you would use to log into your email. You'll have to create an "app password" for your Google account (look up how to do this). Then, set these variables:

```
EMAIL_USER=your-google-email
EMAIL_PASSWORD=app-password-you-created
```

Now, create a copy of the `env.sample` file in the `frontend` directory and rename it `.env`. The one environment variable here is already provided.

### Install packages

From the `backend` directory, run the command `npm install`, and from the `frontend` directory, run the command `npm install`.

### Run the backend and frontend

Open a terminal. From the `backend` directory, run the command `npm run dev`.

Open another terminal. From the `frontend` directory, run the command `npm start`. The web app should automatically open on your computer.