# Plant Parenthood
Become a better plant parent. Plant Parenthood is a database of over 200+ common indoor houseplants. Sign up to easily track plants you own and have quick access to their care information.

## Technologies Used:
* Node/Express
  * Key modules:
    * Cheerio - Plant data scraping from 2 different sources
    * Passport / Bcrypt - Authentication and password hashing
    * Cloudinary / Multer - Profile photo uploading
* PostgreSQL
* Sequelize
* jQuery
* Semantic UI

## Requirements

## User Stories
The target user for this app is the growing number of indoor houseplant enthusiasts. These are not master gardeners, they are people who enjoy adding greenery to their space but may not know all the ins and outs of plant care. 
* As a user, I want to...
  * be able to easily save and keep track of my houseplants and see their care information displayed in a simple, easy to read format (without a ton of "master gardener" jargon). Similarly, I should be able to easily delete plants from my collection.
  * be able to comment on plants and get feedback or suggestions from others on my issues or questions.
  * be easily track when was the last day I checked on my plants (because they might need water!).
  * be able to write a personal journal about adjustments I've made in my plant care routine, or tips I've learned along the way.

### Development Sprints and Process
#### Sprint 1
Wireframes
Moodboard
#### Sprint 2
#### Sprint 3

Pictured above - Trello board status as Sprint 3 wraps.

## Routes and Models

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
    * `GET /plants/search` - runs a query for the plant based on the user's search input
    * `GET /plants/notfound` - loads 404 page when user searches for a plant that doesn't exist
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
  * Tags
    * `GET /tags/:id` - renders all plants for the selected tag
  * Users
    * `GET /users/profile` - renders user's profile page when logged in
    * `GET /users/plants` - renders page with user's full collection of saved plants
    * `GET /users/profilepic` - renders page to update user's profile picture
    * `POST /users/profile` - uploads user's new profile picture through Cloudinary
    * `POST /users/lastwatered` - edits the date in the database when user last checked on their plants
* Models

## Steps to Setting Up
If you'd like to set this project up on your own local server:
* Fork and clone this repository
* Run `npm install` to install dependencies
  * Use `nodemon` to start your application
* Setup your database (this app already has one existing model)
  * Run `createdb plantparenthood` to create the database
  * Run `sequelize db:migrate` to run migrations
* Create .env file, which will need to include:
  * SESSION_SECRET (you determine this)
  * BASE_URL (where you will deploy the site)
  * CLOUDINARY_URL (from your Cloudinary account)
* Review database setup file
  * Follow directions in file and run `node FILENAME` to scrape content into your database

## Sources
* Plant Data
  * Plant Care Rankings - http://extension.uga.edu/publications/detail.html?number=B1318
  * Individual Plant Images - https://www.wikipedia.org/
* Supporting Icons and Imagery
  * Stock Photos
    * https://unsplash.com/photos/tn0496xKk8Q
  * Icons - Noun
    * https://thenounproject.com/term/drop/1372766/
    * https://thenounproject.com/term/fog/19882/
    * https://thenounproject.com/term/sun/1241046/
    * https://thenounproject.com/term/temperature/399436