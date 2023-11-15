# Bones CMS Backend

## Overview

Bones CMS is an easy to use content management system that can be customized and plugged into an existing website. It serves as an alternative to Wordpress or other paid services for a small business to include a blog on their website, which can help to drive traffic from search engines. This project is currently in development with the basic structure of accounts and posts in place. I would like to make some improvements and additions before deploying this on behalf of clients.

This repo contains only the backend API which is accessed by the completely separate [React frontend](https://github.com/matthewsanner/bones-cms-react).

## Project Architecture
Uses Node.js with Express server, incoming requests are routed through index.js to the routes folder where they are handled. I would ultimately like to separate out most of the actions handled in routes to a separate controllers folder. There are also some middlewares in the utilities folder.

Utilizes Mongoose to better interact with the Mongo database. Schemas are outlined in the models folder.

## Installation

If you would like to install Bones backend locally, make sure you first have [Node.js](https://nodejs.org/en/download) installed on your system, which includes npm. You should also have a Github account so that you can fork the repo from this page and then clone your fork to your local system.

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-FORKED-REPOSITORY-NAME
```
Then you should install all dependencies locally.

```bash
npm install
```

Now make sure that you also have the [React frontend](https://github.com/matthewsanner/bones-cms-react) installed separately, and follow the installation instructions there.

You should also [install a local version](https://www.mongodb.com/docs/manual/installation/) of MongoDB or else set up a hosted database at [MongoDB Atlas](https://www.mongodb.com/atlas/database). Note the address of your database.

## Usage

You will want to create a local .env file, filling in the values with your own. The frontend address, including port, would be discovered upon launching the [frontend](https://github.com/matthewsanner/bones-cms-react). It is necessary to include that value to avoid CORS issues when the frontend attempts to communicate with the backend. If you don't specify a port it will use 3000 by default.

```yaml
## .env file
## locally hosted database address may look something like this- mongodb://localhost:27017/your-database-name
DB_URL=YOUR-DATABASE-ADDRESS 
## can be any secret you like
SECRET=YOUR-SECRET
CORS_ORIGIN=YOUR-FRONTEND-ADDRESS
PORT=DESIRED-PORT
```

To host the backend locally, you should launch the main javascript file using node. You could also use nodemon for automatic server refreshing on saves, if you have that installed.

```bash
node index.js
## or use Nodemon
nodemon index.js
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

This version of Bones has been entirely created by me thus far, although a [previous version](https://github.com/matthewsanner/bones-cms) using Express and EJS templates was created with assistance from [@betodute](https://github.com/betodute). Thanks Beto!

If anyone is interested in contributing to this project, let's start with a conversation and then we could proceed to making an issue and I'd be happy to accept pull requests that fit well with the project!

Reach out to me at [matthewsannerdev@gmail.com](mailto:matthewsannerdev@gmail.com) with any questions, ideas, etc.!

## License

[MIT](https://choosealicense.com/licenses/mit/)
