# 🦴 Bones CMS Frontend 💻

## Live Demo

Check out the live demo at [https://bones-cms-react.onrender.com/](https://bones-cms-react.onrender.com/). **Note:** It takes about 20 seconds to spin up.

## Overview

Bones CMS is an easy to use content management system that can be customized and plugged into an existing website. It serves as an alternative to Wordpress or other paid services for a small business to include a blog on their website, which can help to drive traffic from search engines. This project is currently in development with the basic structure of accounts and posts in place.

This repo contains only the frontend code which makes calls to a completely separate [backend API](https://github.com/matthewsanner/bones-cms-backend).

## Project Architecture

Bones frontend uses Vite for the React setup. The index.html file references main.jsx which in turn references App.jsx which contains the navbar and uses React Router to route to the particular pages and blog posts. The 'authenticated' state keeps track of whether a user is signed in or not. The frontend makes calls to the backend to retrieve session data and posts as well as to create, edit, and delete posts.

## Installation

If you would like to install Bones frontend locally, make sure you first have [Node.js](https://nodejs.org/en/download) installed on your system, which includes npm. You should also have a Github account so that you can fork the repo from this page and then clone your fork to your local system.

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-FORKED-REPOSITORY-NAME
```
Then you should install all dependencies locally.

```bash
npm install
```

Now make sure that you also have the [React backend](https://github.com/matthewsanner/bones-cms-backend) installed separately, and follow the installation instructions there, including setup for a Mongo database.

## Usage

You will want to create a local .env file, filling in the values with your own. In development, your base url should be at your local host and any port you specified for the backend, otherwise 3000 by default. Additionally, please note that the backend endpoints are all at the root /api.

```yaml
## .env file
## base url may look something like this- http://localhost:3000/api
VITE_API_BASE_URL=YOUR-BACKEND-ADDRESS-PLUS-/API
```

To host the frontend locally, you should launch it using npm.

```bash
npm run dev
```

Note the address and port of your hosted frontend, as you will need to plug that into the .env file on the backend for CORS reasons.

## Roadmap
Features I would like to add:
- comments
- account roles
- an admin page
- customization options
- account verification by email

Currently Bones includes a navbar that I might like to get rid of except for on the admin page, such that the posts could easily fit into an existing website and it's structure and themes. It's nice to have in development though. I'm still envisioning how to best implement Bones with this kind of flexibility.

## Contributing

This version of Bones has been entirely created by me thus far, although a [previous version](https://github.com/matthewsanner/bones-cms) using Express and EJS templates was created with assistance from [@betodute](https://github.com/betodute). Thanks Beto!

If anyone is interested in contributing to this project, let's start with a conversation and then we could proceed to making an issue and I'd be happy to accept pull requests that fit well with the project!

Reach out to me at [matthewsannerdev@gmail.com](mailto:matthewsannerdev@gmail.com) with any questions, ideas, etc.!

## License

[MIT](https://choosealicense.com/licenses/mit/)
