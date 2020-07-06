# todos app | fullstack mevn

Basic fullstack todolist app built using the MEVN stack.

![Preview Image](https://i.imgur.com/o7UmZGv.png)

## Next Steps

- [ ] Todo categories
- [x] Task date of creation
- [x] Click away to exit edit mode
- [ ] Dark mode
- [ ] Better design/theme

## Built With

Name | Description
------------ | -------------
Bootstrap 4 | The most popular front-end framework for developing responsive, mobile first projects on the web.
Vue.JS | Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.
vue-toastr | vue-toastr is Toast plugin for Vue.js.
ExpressJS | Fast, unopinionated, minimalist web framework for node.
body-parser | Node.js body parsing middleware
cors | Node.js CORS middleware
Mongoose | MongoDB object modeling designed to work in an asynchronous environment.
MongoDB | MongoDB is a cross-platform document-oriented database program.
@vue/cli-plugin-pwa | pwa plugin for vue-cli

## Quickstart

### Prerequisites

- Rename server/config/examplekeys.js to server/config/keys.js

- Modify the MongoDB connection string in server/config/keys.js to your own

- Have NodeJS installed

### Installation

```bash
# Install backend dependencies
npm install

# Start backend Express DevServer
npm run dev

# Install frontend dependencies
cd client && npm install

# Start frontend Vue DevServer
cd client
npm run serve

# Build frontend for production
cd client
npm run build

```

## API Routes

* GET /api/todos (retrieves todolist from DB and returns as an array)

* GET /api/todo/:id (retrieves single todo task from DB and returns as object)

* POST /api/todo (adds a todo task to the todolist in DB)

* PUT /api/todo/:id (updates todo task in DB)

* DELETE /api/todo/:id (deletes todo task in DB)

## Version

1.2.4

## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2020 Martin Sit
