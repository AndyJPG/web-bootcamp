#Comment New/Create
* Nested routes
* Add the comment new and create routes
* Add the new comment form


#RESTFUL ROUTES

name      url         verb        desc.
================================================
INDEX    /dogs       GET         Display a list of all dogs
NEW      /dogs/new   GET         Display form to make a new dog
CREATE   /dogs       POST        Add new dog to database

INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds
SHOW    /campgrounds/:id

NEW     /campgrounds/:id/comments/new    GET
CREATE  /campgrounds/:id/comments        POST

#Authentication

##Intro to Auth
* What tools are we using?
    * Passport
    * Passport Local
    * Passport Local Mongoose
* Walk through auth flow
* Discuss sessions
    * Express-Session

#Auth Code Along Part 1
* Set up folder structure
* Install needed packages
* Add root route and template
* Add secret route and template

#Auth Code Along Part 2
* Create User Model
* Configure passport

#Auth CodeAlong Part 3
* Add Register routes
* Add Register form

#Auth CodeAlong Part 4
* Add Login routes
* Add Login form

#Auth CodeAlong Part 5
* Add logout Route
* Add isLoggedIn middleware
