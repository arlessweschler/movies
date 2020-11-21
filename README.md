<img src="src/assets/img/readme-images/movies_readme_banner_without_stars.png">

[![Actions Status](https://github.com/nk11dev/movies/workflows/e2e-tests/badge.svg)](https://github.com/nk11dev/movies/actions?query=workflow%3Ae2e-tests)

Movies is a responsive React app with SSR support that utilized real movies data API provided by [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api). 

#### Demo: [nk11dev-movies.herokuapp.com](https://nk11dev-movies.herokuapp.com/)

#### List of contents

- [Technology stack](#Technology-stack)
- [Features](#Features)
- [NPM scripts](#NPM-scripts)
- [Environment variables](#Environment-variables)
- [Roadmap](#Roadmap)
- [About](#About)

## Technology stack
- 🏄 Babel 7
- 🎁 Webpack 4
- 📐 ESLint 7 (based on "eslint-plugin-import", "eslint-plugin-react", "eslint-config-airbnb-base" + some customizations)
- 👌 End-to-end tests with Cypress
- 🚀 Server Side Rendering / Client Side Rendering with Express
- ⚡ Hot Module Replacement  (supports server-side and sagas)
- ✔️ React 16.x (latest), with Hooks
- ✔️ Redux + Sagas
- ✔️ React Router 4
- ✔️ React i18next for multi language support
- 🍦️ SASS, Bootstrap 4 + Fontawesome 5

## Features
#### 🎥 Watch movies lists, filtered by categories: "Now playing", "Popular", "Top rated" and "Upcoming". Pagination is supported.
*Example: "Top rated" category, page 1 for Russian region*:

<img src="src/assets/img/readme-images/screens/screen_1.png">

#### 🎥 Search movies by title
*Example: Found 60 movies by search query "Terminator":*

<img src="src/assets/img/readme-images/screens/screen_2.png">

#### 🎥 Watch movie details
- original title, genres, production countries, release date, duration
- creators: director, writing, director of photography, original music composer, actors
- movie rating based on TMDb users votes
- tagline and overview
- poster
- YouTube trailer 
- and big cool backdrop image

*Example: movie details for "The Big Lebowski" (1998):*

<img src="src/assets/img/readme-images/screens/screen_3.png">

#### 🎥 Watch actors list
*Example: actors list for "The Usual Suspects" (1995):*

<img src="src/assets/img/readme-images/screens/screen_4.png">

#### 🎥 Watch image gallery in fullscreen mode
*Example: Fullscreen image gallery for "Reservoir Dogs" (1992):*

<img src="src/assets/img/readme-images/screens/screen_5.png">

#### 🎥 Watch recommendations
*Example: recommendations for "Ice Age" (2002):*

<img src="src/assets/img/readme-images/screens/screen_6.png">
    
#### 🎥 Switch localizations

EN (English) and RU (Russian) languages are available. 
With locale changing also changes movie displayed data (in relation with selected language): title, tagline, description, poster, videos.

*Example: English localization for "Avengers: Endgame" (2019):*

<img src="src/assets/img/readme-images/screens/screen_7.png">

*Example: Russian localization for "Avengers: Endgame" (2019):*

<img src="src/assets/img/readme-images/screens/screen_8.png">

## NPM scripts
#### Installation
- `npm install`

Notation: if you want to clone this app and use it by yourself, you should register account at TMDb and use your own TMDb API key. For getting API to work you should create `.env` file at the root folder and put in `TMDB_API_KEY` variable with your TMDb API key as value.

Example of `.env` file you could find in `/configs/.env.defaults` file.
```yaml
TMDB_API_KEY=put_your_api_key_here
TMDB_API_HOST=https://api.themoviedb.org/3
TMDB_API_REGION=RU
PORT_CLIENT=8080
PORT_SERVER=8081
RENDERING=client
```

#### Development mode
- `npm run dev:client` (`npm run dev`) - launch client-side React app by Webpack Dev Server with HMR *(by default available on [localhost:8080](http://localhost:8080))*. *If your changes affects only client-side, running this script will be enough for you.*
- `npm run dev:server` - launch server-side Express app by Nodemon tool for hosting `/dist/client/` folder *(by default available on [localhost:8081](http://localhost:8081))*. *This script useful if you want to change server-side behavior or work with client-side as Express-hosted app.*

#### Production mode
- `npm run build` - build client and server for production
- `npm start` - launch built Express server for hosting `/dist/client/` folder 

#### Testing
- `npm run cypress` - open Cypress test runner 
- `npm run cypress:run` - run Cypress tests to completion
- `npm test` - start Webpack Dev Server, wait for a url to respond, then run Cypress tests. When the test process exits, shut down Webpack Dev Server

#### Linting
- `npm run lint` - run ESLint with `./**` search pattern 
- `npm run lint:fix` - run ESLint with `--fix` flag

## Environment variables

There is some environment variables with default values stored in `/configs/.env.defaults`

| Variable         | Default            | Description                                                      
| ---------------- | ------------------ |------------------ |
| `TMDB_API_KEY` | none | Your TMDb API key, used by internal module `ApiService.js` for fetching movies data |
| `TMDB_API_HOST` | https://api.themoviedb.org/3 | TMDb v3 API host, used by internal module `ApiService.js` for fetching movies data |
| `TMDB_API_REGION` | RU | TMDb API region paramater will act as a filter to search for and display matching release date information. This parameter is expected to be an [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.|
| `PORT_CLIENT` | `8080` | Port used by webpack-dev-server with client build |
| `PORT_SERVER` | `8081` | Port used by express for nodemon/production modes |
| `RENDERING` | `client` | Application rendering type. Available values: `client` or `server` |

## Roadmap
- 🔲 QA: write more e2e tests
- 🔲 QA: unit tests (Jest)
- 🔲 CI/CD: keep-alive cron module for Heroku
- 🔲 CI/CD: github actions for CI/CD with Heroku
- 🔲 CI/CD: build flags for github repo
- 🔲 CI/CD: docker images for isolated environment (app running and testing)
- 🔲 setup: static type checking (Flow)
- 🔲 setup: authorization (Firebase)
- 🔲 feature: wishlist
- 🔲 feature: genres filter
- 💥 AND MOST IMPORTANT THING! After completing roadmap - i wil write series of tutorial articles with detailes steps information about: how to code this application in parts and how it works under the hood.

## About

This product uses the TMDb API but is not endorsed or certified by TMDb.

<img src="src/assets/img/tmdb-logos/tmdb_logo_wide.svg">