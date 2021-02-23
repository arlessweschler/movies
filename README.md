<img src="src/assets/img/readme-images/banner.png">

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
- [Webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)
- [ESLint](https://eslint.org/) (based on [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import), [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react), [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) + some customizations)
- [Cypress](https://www.cypress.io/) (E2E testing)
- [Express](https://www.npmjs.com/package/express) (with client-side rendering / server-side rendering support)
- [React 17](https://ru.reactjs.org/)
- [Redux](https://redux.js.org/) + [Sagas](https://redux-saga.js.org/)
- [React Router 5](https://reactrouter.com/)
- [React-i18next](https://react.i18next.com/) (for multi language support)
- Hot Module Replacement  ([react-hot-loader](https://www.npmjs.com/package/react-hot-loader) and [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) with server-side HMR and sagas HMR support)
- [Sass](https://www.npmjs.com/package/sass), [CSS Modules](https://github.com/css-modules/css-modules), [Bootstrap 4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction/) + [Font Awesome 5](https://fontawesome.com/)

### 💻 NPM scripts

<details> 
  <summary>Installation</summary>

<br />

**Command**: `npm install`

Install dependencies via npm.

> **Note**: if you want to clone this app and use it by yourself, you should register account at [TMDb](https://www.themoviedb.org/signup) and use your own [TMDb API key](https://developers.themoviedb.org/3/getting-started/introduction). For getting API to work you should create `.env` file at the root folder and put in `TMDB_API_KEY` variable with your TMDb API key as value. Example of `.env` file you could find in `/configs/env/.env.defaults` file.

---

</details>

<details> 
  <summary>Development</summary>

<br />

**Command**: `npm run dev:client` or shorthand `npm run dev`

Run client-side React app by Webpack Dev Server with HMR *(by default available on [localhost:8080](http://localhost:8080))*. 
> **Note**: If your changes affects only client-side, running this script will be enough for you.

<br />

**Command**: `npm run dev:server`

Run server-side Express app by Nodemon tool for hosting `/dist/client/` folder *(by default available on [localhost:8081](http://localhost:8081))*. 
> **Note**: This script useful if you want to change server-side behavior or work with client-side as Express-hosted app.

---

</details>

<details> 
  <summary>Production</summary>

<br />

**Command**: `npm run build`

Build client and server for production.

<br />

**Command**: `npm start`

Run bundled Express server for hosting `/dist/client/` folder.

---

</details>

<details> 
  <summary>Testing</summary>

<br />

**Command**: `npm run cypress`

Open Cypress test runner.

<br />

**Command**: `npm run cypress:run`

Run Cypress tests to completion.

<br />

**Command**: `npm test`

Start Webpack Dev Server, wait for a url to respond, then run Cypress tests. When the test process exits, shut down Webpack Dev Server.

---

</details>

<details> 
  <summary>Linting</summary>

<br />

**Command**: `npm run lint`

Run ESLint with `./**` search pattern.

<br />

**Command**: `npm run lint:fix`

Run ESLint with `--fix` flag.

</details>


### 🔧 Environment variables

There is some environment variables with default values stored in `/configs/env/.env.defaults`

<details> 
  <summary>Variables list</summary>

| Variable         | Default            | Description                                                      
| ---------------- | ------------------ |------------------ |
| `TMDB_API_KEY` | none | Your TMDb API key, used by internal module `API.js` for fetching movies data |
| `TMDB_API_HOST` | https://api.themoviedb.org/3 | TMDb v3 API host, used by internal module `API.js` for fetching movies data |
| `TMDB_API_REGION` | US | TMDb API region paramater will act as a filter to search for and display matching release date information. This parameter is expected to be an [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.|
| `PORT_CLIENT` | `8080` | Port used by webpack-dev-server with client build |
| `PORT_SERVER` | `8081` | Port used by express for nodemon/production modes |
| `RENDERING` | `client` | Application rendering type. Available values: `client` or `server` |
| `DEBUG_MODE` | `1` | Debug mode. Available values: `0` or `1`. Enables Express log with `morgan` logger and Redux log with `redux-logger` |
</details>

### 🍦️ Roadmap
- [ ] QA: write more e2e tests, add unit tests (Jest);
- [ ] CI/CD: add docker images as isolated environment for application running and testing;
- [ ] Technologies: static type checking (Typescript), authorization (Firebase);
- [ ] Application features: users wishlist, genres filter;

🎓 Article: step by step tutorial with best practices about "How to code application like this".

### ✌️ About
**Author**: [nk11dev](https://github.com/nk11dev).

This product uses the TMDb API but is not endorsed or certified by TMDb.

[<img src="src/assets/img/tmdb-logos/tmdb_logo_wide.svg">](https://www.themoviedb.org/)