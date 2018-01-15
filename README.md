# Plant Parenthood
Become a better plant parent.

Technologies Used:

## Requirements

## Process

### User Stories

### Trello

### Wireframes

### Development Sprints

## Setup

* Routes
  * Index
    * `GET /` - home page that welcomes user
  * Auth
    * `GET /auth/login` - renders login page
    * `POST /auth/login` - signs in existing user 
    * `GET /auth/signup` - renders sign up page  
    * `POST /auth/signup` - creates new user in database 
    * `GET /auth/logout` - logs out user 
  * Plants
    * `GET /plants` - loads full plant database
	* `GET /plants/:id` - loads individual plant
	* `POST /plants` - associates plant with user in the database (adds to their list of plants)
	* `DELETE /plants/:id` - removes association of user and plant in the database (removes from list of plants)
  * Comments
    * `POST /comments` - adds comment to individual plant
    * `DELETE /comments/:id` - removes comment from individual plant
  * Journal
    * `GET /journal` - renders full page of all journal entries
    * `GET /journal/new` - renders page for user to post a new journal entry
    * `GET /journal/:id` - renders page for individual journal entry
    * `POST /journal` - adds entry to user's journal
    * `GET /journal/edit/:id` - renders page for user to edit an existing journal entry
    * `PUT /journal/:id` - edits journal entry in database
    * `DELETE /journal/:id` - deletes journal entry from database
  * Users
    * `GET /users/profile` - renders user's profile page when logged in
    * `GET /users/plants` - renders page with user's full collection of saved plants
    * `POST /users/lastwatered` - edits the date in the database when user last checked on their plants
* Models


## Getting Started
* Fork and clone this repository
* Run `npm install` to install dependencies
  * Use `nodemon` to start your application
* ENV
* Sequelize

## Sources
* Data
  * Plant Care Rankings - http://extension.uga.edu/publications/detail.html?number=B1318
* Images
  * Individual Plant Images - Wikipedia
  * Stock Photos
    * https://unsplash.com/photos/tn0496xKk8Q
  * Icons - Noun
    * https://thenounproject.com/term/drop/1372766/
    * https://thenounproject.com/term/fog/19882/
    * https://thenounproject.com/term/sun/1241046/
    * https://thenounproject.com/term/temperature/399436