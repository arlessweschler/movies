# Стартовый репозиторий с примером сборки Webpack 4/ Express/ React + Redux/ SSR
## Содержание

- [Стек](#стек)
- [Скрипты](#Скрипты)
- [Переменные окружения](#Переменные-окружени)

## Стек
- Сборка
    - Babel 7
            -   @babel/preset-env
            -   @babel/preset-react
            -   @babel/plugin-proposal-decorators
            -   @babel/plugin-proposal-class-properties
    - Webpack 4
            -  bootstrap-loader
            -  sass-loader
            -  file-loader
    - Server Side Rendering с Express
    - Hot Module Replacement


- Библиотеки и зависимости
  - React 16.x (latest)
  - Redux + Thunk middleware 
  - React Router 4
  - Bootstrap 4 + Fontawesome 5

## Скрипты
##### Установка
`npm install`
##### Режим разработки 
`npm run dev-client` (или `npm start`) - запускает клиентский webpack-dev-server с HMR
`npm run dev-server` - запускает серверный nodemon с API для отдачи данных на клиент

##### Режим продакшена 
`npm run build-client` - собирает клиент в продакшен
`npm run build-server` - собирает сервер в продакшен
`npm run start-server` - запускает сервер, который запускает собранный сервер и хостит собранный клиент

Также можно проверять продакшен сборку клиента в режиме nodemon сервера цепочкой команд `npm run build-client`, `npm run dev-server`

## Переменные окружения

В package.json указаны некоторые переменные окружения

| Variable         | Default            | Description                                                      
| ---------------- | ------------------ |------------------ |
| `API_PATH` | `http://127.0.0.1:8081/api` | Путь до API на севере. *(Используется в клиентской части приложения)* |
| `PORT_SERVER` | `8081` | Порт, на котором запускается сервер в nodemon/production режимах. *(Используется в конфигурации сервера express )* |
| `PORT_CLIENT_DEV` | `8080` | Порт, на котором запускается webpack-dev-server с клиентской сборкой. (*Используется в клиентской конфигурации webpack*) |
| `RENDERING` | `client` | Тип рендеринга приложения. Доступные значения: `client`/`server`. При установке значения `server` в клиентские и серверный скрипты пробрасывается переменная окружения `IS_SSR`? которая является признаком включенного серверного рендеринга. *(Используется в клиентских и серверных скриптах)* |