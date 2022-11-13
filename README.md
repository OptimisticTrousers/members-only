# Members Only Application

## Description

[App] Creating an members only, which is an exclusive clubhouse-like application. Allows users to sign in, log in, make posts, and view posts. If the user is able to enter a special passcode, they will be members of the club! If the user is also able to enter another password, they will be admins of the application, allowing them to delete posts.

> See it live on [optimistictrousers.github.io/inventory-application](https://optimistictrousers.github.io/inventory-application/)
> Or clone repo, cd into repo, then run "npm run devstart"

## Purpose

Creating an Express application using MongoDB, Mongoose, Passport and Pug. Learned about sessions and cookies. Using Passport.js for authentication. Using the MVC pattern to design the application. Application generated with the express-application-generator command. https://expressjs.com/en/starter/generator.html

Beyond that, other learning outcomes were:

- Using Passport.js to authenticate users
- Learned how Passport.js creates sessions and cookies to keep users signed in
- Learned how to use the Passport.js LocalStrategy
- Using bcrypt to add a hash and salt to user passwords

## Features

1. Allows users to sign in
2. Allows users to log in
3. Allows users to create posts if logged in
4. Allows users to delete posts if they are admins
5. Allows users to become members of this exclusive clubhouse if they enter a secret passcode
6. Allows users to admins if they enter a secret password
7. Allows users to view posts
8. Allows users to see who wrote the post if they are clubhouse members

## Development

### Technologies used

- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Passport](https://www.passportjs.org/) - Middleware used to authenticate users
- [Node](https://nodejs.org/en/) - JavaScript runtime
- [Mongoose](https://mongoosejs.com/docs/) - Object Data Model for MongoDB
- [Pug](https://pugjs.org/api/getting-started.html) - A templating engine

## Areas for Improvement

* [ ] Create a "Show Password" section in the sign up form or a "Confirm Password" field.

## Known Bugs

1. None identified so far
