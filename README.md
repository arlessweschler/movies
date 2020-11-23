<img src="src/assets/img/readme-images/movies_readme_banner_without_stars.png">

[![Actions Status](https://github.com/nk11dev/movies/workflows/e2e-tests/badge.svg)](https://github.com/nk11dev/movies/actions?query=workflow%3Ae2e-tests)

Movies is a responsive React app with SSR support that utilized real movies data API provided by [The Movie Database (TMDb)](https://www.themoviedb.org/). 

### 🏄 Demo: [nk11dev-movies.herokuapp.com](https://nk11dev-movies.herokuapp.com/)

### 🎥 Features
- Filter movies by category: "Now playing", "Popular", "Top rated" and "Upcoming"
- Search movies
- Switch localizations
- Watch movie details (including trailer, actors and images)
- Watch recommendations

<img src="src/assets/img/readme-images/demo.gif">

### 🚀 Technologies
- Babel 7
- Webpack 4
- ESLint 7 (based on "eslint-plugin-import", "eslint-plugin-react", "eslint-config-airbnb-base" + some customizations)
- End-to-end tests with Cypress
- Server Side Rendering / Client Side Rendering with Express
- Hot Module Replacement  (supports server-side and sagas)
- React 16.x (latest), with Hooks
- Redux + Sagas
- React Router 4
- React i18next for multi language support
- SASS, Bootstrap 4 + Fontawesome 5

### 💻 NPM scripts

<details> 
  <summary>Installation</summary>
  
- `npm install`

*Notation: if you want to clone this app and use it by yourself, you should register account at TMDb and use your own TMDb API key. For getting API to work you should create `.env` file at the root folder and put in `TMDB_API_KEY` variable with your TMDb API key as value.*

*Example of `.env` file you could find in `/configs/env/.env.defaults` file.*
</details>

<details> 
  <summary>Development</summary>

- `npm run dev:client` (`npm run dev`) - launch client-side React app by Webpack Dev Server with HMR *(by default available on [localhost:8080](http://localhost:8080))*. *If your changes affects only client-side, running this script will be enough for you.*
- `npm run dev:server` - launch server-side Express app by Nodemon tool for hosting `/dist/client/` folder *(by default available on [localhost:8081](http://localhost:8081))*. *This script useful if you want to change server-side behavior or work with client-side as Express-hosted app.*
</details>

<details> 
  <summary>Production</summary>

- `npm run build` - build client and server for production
- `npm start` - launch built Express server for hosting `/dist/client/` folder 
</details>

<details> 
  <summary>Testing</summary>

- `npm run cypress` - open Cypress test runner 
- `npm run cypress:run` - run Cypress tests to completion
- `npm test` - start Webpack Dev Server, wait for a url to respond, then run Cypress tests. When the test process exits, shut down Webpack Dev Server
</details>

<details> 
  <summary>Linting</summary>

- `npm run lint` - run ESLint with `./**` search pattern 
- `npm run lint:fix` - run ESLint with `--fix` flag
</details>


### 🔧 Environment variables

There is some environment variables with default values stored in `/configs/env/.env.defaults`

<details> 
  <summary>Variables list</summary>

| Variable         | Default            | Description                                                      
| ---------------- | ------------------ |------------------ |
| `TMDB_API_KEY` | none | Your TMDb API key, used by internal module `API.js` for fetching movies data |
| `TMDB_API_HOST` | https://api.themoviedb.org/3 | TMDb v3 API host, used by internal module `API.js` for fetching movies data |
| `TMDB_API_REGION` | RU | TMDb API region paramater will act as a filter to search for and display matching release date information. This parameter is expected to be an [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.|
| `PORT_CLIENT` | `8080` | Port used by webpack-dev-server with client build |
| `PORT_SERVER` | `8081` | Port used by express for nodemon/production modes |
| `RENDERING` | `client` | Application rendering type. Available values: `client` or `server` |
| `DEBUG_MODE` | `1` | Debug mode. Available values: `0` or `1`. Enables Express log with `morgan` logger and Redux log with `redux-logger` |
</details>

### 🍦️ Roadmap
- 🔲 QA: write more e2e tests, add unit tests (Jest)
- 🔲 CI/CD: add docker images for isolated environment (app running and testing)
- 🔲 setup: static type checking (Flow), authorization (Firebase)
- 🔲 features: wishlist, genres filter
- 🎓 tutorial: step by step tutorial with best practices about "How to code this app"

### ✌️ About

This product uses the TMDb API but is not endorsed or certified by TMDb.

[<img src="src/assets/img/tmdb-logos/tmdb_logo_wide.svg">](https://www.themoviedb.org/)