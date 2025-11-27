# 🦴 Bones CMS 🖥️

## Live Demo

Check out the live demo at [https://bones-cms.onrender.com/](https://bones-cms.onrender.com/). **Note:** It takes about 40 seconds to spin up.

## Overview

Bones CMS is an easy to use content management system that can be customized and plugged into an existing website. It serves as an alternative to Wordpress or other paid services for a small business to include a blog on their website, which can help to drive traffic from search engines. This project is currently in development with the basic structure of accounts and posts in place.

## Project Architecture

Bones CMS backend uses Node.js with Express server, incoming requests are routed through index.js to the routes folder where they are handled. I would ultimately like to separate out most of the actions handled in routes to a separate controllers folder. There are also some middleware in the utilities folder. For authentication and authorization, it uses Passport which stores an id in a cookie on the user's browser and logs session data to the Mongo database. It utilizes Mongoose to better interact with the Mongo database. Schemas are outlined in the models folder.

Bones frontend is contained inside the 'client' folder and uses Vite for the React setup. The index.html file references main.jsx which in turn references App.jsx which contains the navbar and uses React Router to route to the particular pages and blog posts. The 'authenticated' state keeps track of whether a user is signed in or not. The frontend makes calls to the backend to retrieve session data and posts as well as to create, edit, and delete posts.

## Installation

If you would like to install Bones locally, make sure you first have [Node.js](https://nodejs.org/en/download) installed on your system, which includes npm. You should also have a Github account so that you can fork the repo from this page and then clone your fork to your local system.

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-FORKED-REPOSITORY-NAME
```

Then you should install all backend and frontend dependencies locally

```bash
npm install # backend is at the root

cd client
npm install
```

You should also [install a local version](https://www.mongodb.com/docs/manual/installation/) of MongoDB or else set up a hosted database at [MongoDB Atlas](https://www.mongodb.com/atlas/database). Note the address of your database.

## Usage

You will want to create a backend/root and frontend/client .env file, filling in the values with your own.

```yaml
# backend/root .env file
DB_URL=YOUR-DATABASE-ADDRESS # locally hosted database address may look something like this- mongodb://localhost:27017/your-database-name
SECRET=YOUR-SECRET # can be any secret you like
PORT=DESIRED-PORT

# frontend/client .env file
VITE_API_BASE_URL=YOUR-BACKEND-URL/api # possibly http://localhost:3000/api
```

To host the backend locally, you should launch the index.js file using node or use the npm start command. You could also use nodemon for automatic server refreshing on saves, if you have that installed.

```bash
npm start
# or use Nodemon
nodemon index.js
```

To host the frontend locally, cd into the directory and use the npm run dev command.

```bash
cd client
npm run dev
```

## Roadmap

Features I would like to add:

- comments
- account roles
- an admin page
- customization options
- account verification by email

Currently Bones includes a navbar that I might like to get rid of except for on the admin page, such that the posts could easily fit into an existing website and it's structure and themes. It's nice to have in development though. I'm still envisioning how to best implement Bones with this kind of flexibility.

## Contributing

This version of Bones has been entirely created by me thus far, although a [previous version](https://github.com/matthewsanner/bones-cms-original) using Express and EJS templates was created with assistance from [@betodute](https://github.com/betodute). Thanks Beto!

If anyone is interested in contributing to this project, let's start with a conversation and then we could proceed to making an issue and I'd be happy to accept pull requests that fit well with the project!

Reach out to me at [matthewsannerdev@gmail.com](mailto:matthewsannerdev@gmail.com) with any questions, ideas, etc.!

## License

[MIT](https://choosealicense.com/licenses/mit/)
